import hashlib
import requests

import sys


# TODO: Implement functionality to search for a proof 

def proof_of_work(last_proof):
    print("Starting search for new proof")
    proof = 0
    while valid_proof(last_proof, proof) is False:
        print(proof)
        proof += 1

    print(f"Found new proof: {proof}")
    return proof


def valid_proof(last_proof, proof):
    guess = f'{last_proof}{proof}'.encode()
    guess_hash = hashlib.sha256(guess).hexdigest()
    return guess_hash[:6] == "000000"


if __name__ == '__main__':
    # What node are we interacting with?
    if len(sys.argv) > 1:
        node = sys.argv[1]
    else:
        node = "http://localhost:5000"

    coins_mined = 0
    # Run forever until interrupted
    while True:
        # TODO: Get the last proof from the server and look for a new one
        last_proof = requests.get(f'{node}/last_proof').json()['last_proof']
        print(last_proof)

        new_proof = proof_of_work(last_proof)
        print(new_proof)

        # TODO: When found, POST it to the server {"proof": new_proof}
        proof_guess = {"proof": new_proof}
        proof_data = requests.post(f'{node}/mine', json=proof_guess)
        print(proof_data)


        # TODO: If the server responds with 'New Block Forged'
        # add 1 to the number of coins mined and print it.  Otherwise,
        # print the message from the server.
        if proof_data.json()["message"] == "New Block Forged":
            coins_mined += 1
            print(f"Coins mined: {coins_mined}")

        