# This script should be executed from a git repository folder
import os

COMMANDS = {
    'LOG': 'git log',
    'LOGLINE': 'git log --graph --pretty=oneline --abbrev-commit',
    'STATUS': 'git status',
    'STAGE': 'git add -A',
    'COMMIT': 'git commit',
    'PUSH': 'git push',
    'PULL': 'git pull'
}

def exec_command(command):
    os.system(command)

main_actions = {
    '1': COMMANDS['STATUS'],
    '2': f"{COMMANDS['STAGE']} & {COMMANDS['COMMIT']}",
    '3': COMMANDS['PUSH'],
    '4': COMMANDS['PULL']
}

def exec_choice(choice):
    print(f"Executing: {main_actions[choice]}")
    exec_command(main_actions[choice])

def main_menu():
    os.system('cls')
    print("")
    print(30 * "*", "GIT SHELL", 30 * "*")
    print("1. Status")
    print("2. Commit All")
    print("3. Push")
    print("4. Pull")
    print("0: Exit")
    print("")

    choice = input("Enter option >> ")

    while (choice != '0'):
        exec_choice(choice)
        choice = ""
        os.system('pause')
        main_menu()

if __name__ == "__main__":
    main_menu()
    os.system('cls')
