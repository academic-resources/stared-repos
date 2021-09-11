import sys
import _helper_functions as hf
from datetime import datetime, timezone
from certvalidator.registry import CertificateRegistry
from oscrypto import asymmetric
import json, pprint
import sqlite3
import urllib

def get_ocsp_response(cert, issuer, algo='sha1', nonce=True, timeout=20):

    if algo not in ('sha1', 'sha256'):
        raise ValueError("{} is not either of sha1 or sha256".format(algo))

    if not isinstance(nonce, bool):
        raise TypeError("{} is not a boolean value for nonce".format(nonce))

    if not isinstance(timeout, int):
        raise TypeError("{} is not an integer value for timeout".format(timeout))

    ocsp_request_obj = hf.return_ocsp_request_object(cert, issuer, algo, nonce)

    ocsp_response_objs = []
    for i in range(len(cert.ocsp_urls)):
        try:        
            ocsp_response_obj = hf.make_ocsp_request(cert.ocsp_urls[i], ocsp_request_obj, timeout)
            ocsp_response_tup = (cert.ocsp_urls[i], ocsp_response_obj)
            ocsp_response_objs.append(ocsp_response_tup)
            #ocsp_response_objs.append(ocsp_response_obj)
        except Exception as e:
            print (e)

    return (ocsp_request_obj, ocsp_response_objs)

def validate_ocsp_response(cert, issuer, ocsp_request_obj, ocsp_response_objs, current_time):
    #print(cert.ocsp_urls) # Just to see how many urls there are
    subject = cert['tbs_certificate']['subject'].native
    errors = {}
    warnings = {}
    lints_list = []
    count = 0
    lints = {}

    for (ocsp_url, ocsp_response_obj) in ocsp_response_objs:
        count += 1
        lints['domain'] = subject['common_name']
        lints['ocsp_url'] = ocsp_url
        lints['response_count'] = count
        #print(ocsp_response_obj.native)
        errors = {}
        warnings = {}
        if isinstance(ocsp_response_obj, urllib.error.HTTPError):
            errors['HTTPError'] = str(ocsp_response_obj)
            lints['errors'] = errors
            lints['warnings'] = warnings
            lints_list.append(lints)
            return lints_list

        if isinstance(ocsp_response_obj, ValueError):
            errors['ValueError'] = str(ocsp_response_obj)
            lints['errors'] = errors
            lints['warnings'] = warnings
            lints_list.append(lints)
            return lints_list

        if (ocsp_response_obj['response_status'].native == 'unauthorized'):
            errors['Unauthorized'] = 'Responder returned unauthorized'
            lints['errors'] = errors
            lints['warnings'] = warnings
            lints_list.append(lints)
            continue

        if (ocsp_response_obj['response_status'].native == 'malformed_request'):
            errors['ResponseFailure'] = 'Responder returned malformed request'
            lints['errors'] = errors
            lints['warnings'] = warnings
            lints_list.append(lints)
            continue

        request_nonce = ocsp_request_obj.nonce_value
        #print (ocsp_response_obj.native)
        response_nonce = ocsp_response_obj.nonce_value
        if request_nonce and response_nonce and request_nonce.native != response_nonce.native:
            errors['NonceVerificationFailure'] = 'Unable to verify OCSP response since the request and response nonces do not match'

        if ocsp_response_obj['response_status'].native != 'successful':
            errors['OCSPCheckFailure'] = 'OCSP check returned as failed'

        response_bytes = ocsp_response_obj['response_bytes']
        if response_bytes['response_type'].native != 'basic_ocsp_response':
            errors['ResponseTypeFailure'] = 'OCSP response is not Basic OCSP Response'
    
        parsed_response = response_bytes['response'].parsed
        tbs_response = parsed_response['tbs_response_data']
        certificate_response = tbs_response['responses'][0]

        certificate_id = certificate_response['cert_id']
        algo = certificate_id['hash_algorithm']['algorithm'].native

        certificate_issuer_name_hash = certificate_id['issuer_name_hash'].native
        certificate_issuer_key_hash = certificate_id['issuer_key_hash'].native
        certificate_serial_number = certificate_id['serial_number'].native
        
        certificate_issuer_name_hash_from_file = getattr(cert.issuer, algo)
        certificate_issuer_key_hash_from_file = getattr(issuer.public_key, algo)
        certificate_serial_number_from_file = cert.serial_number

        if certificate_serial_number != certificate_serial_number_from_file:
            errors['CertificateSerialMismatchFailure'] = \
            'OCSP response certificate serial number does not match request certificate serial number'

        if certificate_issuer_key_hash != certificate_issuer_key_hash_from_file:
            errors['IssuerKeyMismatchFailure'] = 'OCSP response issuer key hash does not match request certificate issuer key hash'

        if certificate_issuer_name_hash != certificate_issuer_name_hash_from_file:
            errors['IssuerNameHashMismatchFailure'] = \
                'OCSP response issuer name hash does not match request certificate issuer name hash'

        this_update_time = certificate_response['this_update'].native
        if current_time < this_update_time:
            errors['ThisUpdateTimeError'] = 'OCSP reponse update time is from the future'

        if "next_update" not in certificate_response or certificate_response['next_update'].native is None:
            warnings['NextUpdateTimeMissing'] = 'OCSP response does not contain next update time'
        else:
            next_update_time = certificate_response['next_update'].native
            if current_time > next_update_time:
                errors['NextUpdateTimeFailure'] = 'OCSP reponse next update time is in the past'
    
        registry = CertificateRegistry(trust_roots=[issuer])

        if tbs_response['responder_id'].name == 'by_key':
            key_identifier = tbs_response['responder_id'].native
            signing_cert = registry.retrieve_by_key_identifier(key_identifier)
        
        elif tbs_response['responder_id'].name == 'by_name':
            signing_certs = registry.retrieve_by_name(tbs_response['responder_id'].chosen, None)
            if signing_certs is not None and len(signing_certs) > 0:
                signing_cert = signing_certs[0]
            else:
                signing_cert = None    

        if signing_cert is None:
            errors['SigningCetificateNotFoundFailure'] = 'OCSP response signing certificate not found'
            lints['errors'] = errors
            lints['warnings'] = warnings
            lints_list.append(lints)
            continue

        if issuer.issuer_serial != signing_cert.issuer_serial:
            if signing_cert_issuer.issuer_serial != issuer.issuer_serial:
                errors['UnauthorizedSigningCertificateFailure'] = 'OCSP response signed by unauthorized certificate'

            extended_key_usage = signing_cert.extended_key_usage_value
            if 'ocsp_signing' not in extended_key_usage.native:
                errors['ExtendedKeyUsageExtensionValueFailure'] = \
                    'OCSP response signing certificate is not the issuing certificate and it does not have value "ocsp_signing"\
                    for the extended key usage extension'           


        sig_algo = parsed_response['signature_algorithm'].signature_algo
        hash_algo = parsed_response['signature_algorithm'].hash_algo
        try:
            check_cert = asymmetric.load_certificate(signing_cert)
            if sig_algo == 'rsassa_pkcs1v15':
                asymmetric.rsa_pkcs1v15_verify(check_cert, parsed_response['signature'].native, tbs_response.dump(), hash_algo)
            elif sig_algo == 'dsa':
                asymmetric.dsa_verify(check_cert, parsed_response['signature'].native, tbs_response.dump(), hash_algo)
            elif sig_algo == 'ecdsa':
                asymmetric.ecdsa_verify(check_cert, parsed_response['signature'].native, tbs_response.dump(), hash_algo)
            else:
                errors['UnsupportedAlgorithmFailure'] = 'OCSP response signature uses unsupported algorithm'

        except(oscrypto.errors.SignatureError):
            errors['SignatureVerificationFailure'] = 'OCSP response signature could not be verified'

        if certificate_response['cert_status'].name == 'revoked':
            revocation_data = certificate_response['cert_status'].chosen
            if revocation_data['revocation_reason'].native is None:
                errors['CertificateValidityFailure'] = 'Certificate revoked due to unknown reason'
            else:
                errors['CertificateValidityFailure'] = 'Certicate revoked due to ' + revocation_data['revocation_reason'].human_friendly

        if 'certs' in parsed_response and parsed_response['certs'].native != None:
            #TODO Check for legit certs
            pass
#            print(parsed_response['certs'].native)

        if len(errors) == 0:
            errors['NoFailure'] = 'No errors in OCSP response'
        if len(warnings) == 0:
            warnings['NoWarning'] = 'No warnings in OCSP response'

        lints['errors'] = errors
        lints['warnings'] = warnings
        lints_list.append(lints)

    return lints_list

if __name__ == '__main__':
    cert_file = sys.argv[1]
    issuer_file = sys.argv[2]
    try:
        cert = hf.return_cert_from_file(cert_file)
    except ValueError:
        raise TypeError("{} is not a valid x509 certificate".format(cert_file))
    try:
        issuer = hf.return_cert_from_file(issuer_file)
    except ValueError:
        raise TypeError("{} is not a valid x509 certificate".format(issuer_file))
    
    current_time = datetime.now(timezone.utc)   

    algo = cert['signature_algorithm']['algorithm'].native
    if algo == "sha256_rsa":
        algo = "sha256"
    elif algo == "sha1_rsa":
        algo = "sha1"

    response = get_ocsp_response(cert, issuer, algo, True)
    ocsp_request = response[0]
    ocsp_responses = response[1]
    print (cert_file[cert_file.rfind("/")+1:cert_file.find(".pem")])
    lints_list = validate_ocsp_response(cert, issuer, ocsp_request, ocsp_responses, current_time)

    connection = sqlite3.connect("lints.db")
    cursor = connection.cursor()
    create_table_query = "CREATE TABLE IF NOT EXISTS LINTS (id INTEGER PRIMARY KEY, domain TEXT, ocspurl TEXT, count INTEGER, errors TEXT, warnings TEXT)"
    cursor.execute(create_table_query)

    for lint in lints_list:

        domain = lint['domain']
        ocsp_url = lint['ocsp_url']
        errors = lint['errors']
        warnings = lint['warnings']
        count = lint['response_count']
        insert_query = "INSERT INTO LINTS (domain, ocspurl, count, errors, warnings) values (?,?,?,?,?)"
        cursor.execute(insert_query, (domain, ocsp_url, count, json.dumps(errors), json.dumps(warnings), ))

    connection.commit()

    cursor.close()
    connection.close()

    print (lints_list[0])

