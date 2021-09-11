from __future__ import annotations


class Singleton:
    __instance = None

    @classmethod
    def getInstance(cls):
        """ Static access method """
        if cls.__instance is None:
            Singleton()
        return cls.__instance

    def __init__(self):
        """ Virtually private constructor """
        if Singleton.__instance is not None:
            raise Exception("This class is a Singleton! Use getInstance method.")
        else:
            Singleton.__instance = self


def client_code():
    print("Lets create a Singleton...")
    only_one = Singleton()
    print(only_one)

    print("Lets get that Singleton instance...")
    same_one = Singleton.getInstance()
    print(same_one)

    try:
        print("Lets try to create another one...")
        another_one = Singleton()
    except:
        print("This class is a Singleton! Use getInstance method.")


if __name__ == "__main__":
    client_code()
