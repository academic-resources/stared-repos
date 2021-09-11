import hashlib
import requests

import sys


def proof_of_work(last_proof):
    """
    Simple Proof of Work Algorithm
    - Find a number p' such that hash(pp') contains 6 leading
    zeroes, where p is the previous p'
    - p is the previous proof, and p' is the new proof
    """

    print("Searching for next proof")
    proof = 0
    while valid_proof(last_proof, proof) is False:
        proof += 1

    print("Proof found: " + str(proof))
    return proof


def valid_proof(last_proof, proof):
    """
    Validates the Proof:  Does hash(last_proof, proof) contain 6
    leading zeroes?
    """
    guess = f'{last_proof}{proof}'.encode()
    guess_hash = hashlib.sha256(guess).hexdigest()
    return guess_hash[:5] == "00000"


if __name__ == '__main__':
    # What node are we interacting with?
    if len(sys.argv) > 1:
        node = sys.argv[1]
    else:
        node = "http://localhost:5001"

    coins_mined = 0
    # Run forever until interrupted
    while True:
        # Get the last proof from the server
        last_proof = requests.get(f'{node}/last_proof').json()['proof']

        new_proof = proof_of_work(last_proof)

        proof_guess = {"proof": new_proof}
        proof_data = requests.post(f'{node}/mine', json=proof_guess)

        if proof_data.json()["message"] == "New Block Forged":
            coins_mined += 1
            print(f"Coins mined: {coins_mined} \n")
        else:
            print(proof_data.json()["message"])
