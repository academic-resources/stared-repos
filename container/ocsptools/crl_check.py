#!/usr/bin/env python3

import os,sqlite3
import subprocess as sp


certs_dir = "/srv/certificates/cert/"

def find(name, path):
    for root, dirs, files in os.walk(path):
        if name in files:
            return os.path.join(root, name)


# select ocspurl,count(ocspurl) from lints where errors like '%Unauthorized%' group by ocspurl;
# select domain from lints where errors like '%Unauthorized%';
# openssl x509 -noout -text -in /srv/certificates/cert/000webhost.com.pem | grep -A 4 'X509v3 CRL Distribution Points'
#| grep 'URI:' | sed -n 's/.*\(http.*\).*/\1/p'
#http://crl.comodoca.com/COMODORSADomainValidationSecureServerCA.crl

if __name__ == '__main__':
    conn = sqlite3.connect('/srv/data/lints5000.db')
    c = conn.cursor()
    
    for row in c.execute("SELECT domain FROM lints WHERE errors LIKE '%Unauthorized%';"):
        name = row[0] + ".pem"
        print(name)
        filepath = find(name, certs_dir)
        uri_proc = sp.run("""openssl x509 -noout -text -in {0} | grep -A 4 'X509v3 CRL Distribution Points' | grep 'URI:' | 
                sed -n 's/.*\(http.*\).*/\\1/p'""".format(filepath), shell=True, stdout=sp.PIPE)
        uri = uri_proc.stdout.decode("utf-8").rstrip("\n")
        wget_proc = sp.run("""wget -O crl.der {0}""".format(uri), shell=True, stdout=sp.PIPE, stderr=sp.PIPE)
        transform_proc = sp.run("""openssl crl -inform DER -in crl.der -outform PEM -out crl.pem""", shell=True)
        chain_proc = sp.run("""OLDIFS=$IFS; IFS=':' certificates=$(openssl s_client -connect {0}:443 -showcerts -servername {0} 2>&1 </dev/null | sed -n '/-----BEGIN/,/-----END/ {{/-----BEGIN/ s/^/:/; p}}'); for certificate in ${{certificates#:}}; do echo $certificate | tee -a chain.pem ; done; IFS=$OLDIFS""".format(row[0]), shell=True, stdout=sp.PIPE)
        cat_proc = sp.run("""cat chain.pem crl.pem > crl_chain.pem""", shell=True)
        check_proc = sp.run("""openssl verify -crl_check -CAfile crl_chain.pem {0}""".format(filepath), shell=True)
        
    conn.close()

