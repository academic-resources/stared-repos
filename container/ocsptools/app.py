from flask import Flask, render_template, request
from ocsp_validator import get_ocsp_response, validate_ocsp_response
from datetime import datetime, timezone
from werkzeug import secure_filename
import _helper_functions as hf
import sys
import json
import os

cwd = os.getcwd()

sys.path.append(cwd+'/testcerts')
from get_certs import getcert

app = Flask(__name__, instance_path=cwd+'/uploads', static_url_path='/static')

os.makedirs(os.path.join(app.instance_path, 'cert'), exist_ok=True)
os.makedirs(os.path.join(app.instance_path, 'chain'), exist_ok=True)

@app.route('/', methods=['GET','POST'])
def home():
    return render_template('index.html')

@app.route('/response', methods=['GET','POST'])
def response():
    return render_template('response.html')

def lint(filename, chain_file):
    try:
        cert = hf.return_cert_from_file(os.path.join(app.instance_path, 'cert', filename))
    except ValueError:
        return "{} is not a valid x509 certificate".format(cert_file.filename)

    try:
        issuer = hf.return_cert_from_file(os.path.join(app.instance_path, 'chain', chain_file))
    except ValueError:
        return "{} is not a valid x509 certificate".format(issuer_file.filename)

    current_time = datetime.now(timezone.utc)   

    algo = cert['signature_algorithm']['algorithm'].native
    if algo == "sha256_rsa":
        algo = "sha256"
    elif algo == "sha1_rsa":
        algo = "sha1"

    response = get_ocsp_response(cert, issuer, algo, True)
    ocsp_request = response[0]
    ocsp_responses = response[1]

    lints_list = validate_ocsp_response(cert, issuer, ocsp_request, ocsp_responses, current_time)
    return json.dumps(lints_list[0])

@app.route('/response-check', methods=['GET','POST'])
def response_check():
    response_string = ""
    if request.method == 'POST':
        check = request.form.get('action')
        if check == "Check OCSP Response":
            cert_file = request.files['cert-file']
            cert_file.save(os.path.join(app.instance_path, 'cert', secure_filename(cert_file.filename)))

            issuer_file = request.files['issuer-file']
            issuer_file.save(os.path.join(app.instance_path, 'chain', secure_filename(issuer_file.filename)))

            return lint(secure_filename(cert_file.filename), secure_filename(issuer_file.filename))

        elif check == "Check OCSP Response URL":
            url = request.form.get('url')
            cert_data = getcert(url, single=True)
            filename = url + ".pem"
            filename_chain = url + "-chain.pem"
            if cert_data[0] is not None:

                with open (os.path.join(app.instance_path, "cert", filename), "w+") as f:
                    f.write(cert_data[0])
                    f.close()
                with open (os.path.join(app.instance_path, "chain", filename_chain), "w+") as f:
                    for c in cert_data[1]:
                        f.write(c + "\n")
                    f.close()

                return lint(filename, filename_chain)
            else:
                errors = {}
                errors['fatal_error'] = cert_data[1]
                print (errors)
                return json.dumps(errors)
                


if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0', port=4000)