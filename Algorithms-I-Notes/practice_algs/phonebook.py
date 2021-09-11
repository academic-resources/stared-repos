
# O(n) Linear Time Solution

phonebook = ['Aaron', 'Angela', 'Andrew', 'Banana', 'Beej', 'Cameron', 'Cindy', 'Cynthia', 'Dawn', 'Doug', 'Edwin', 'Eugene', 'Frank', 'Georgia', 'Gunder', 'Harriet', 'Herbert', 'Irene', 'Juniper', 'Justice', 'Kyle', 'Liza', 'Lyla', 'Mary', 'Morgan', 'Naomi', 'Nick', 'Ophelia', 'Patty', 'Pumpkin', 'Quincy', 'Ronald', 'Ruth', 'Sascha', 'Simone', 'Talia', 'Tywin', 'Uddhav', 'Victor', 'Winston', 'Ximena', 'Yahaira', 'Zane', 'Zeke']

def name_in_phonebook(to_find):
    for name in phonebook:
        if name == to_find:
            return True

    return False

print(name_in_phonebook("Beej"))
print(name_in_phonebook("Zane"))
print(name_in_phonebook("Hannah"))


# O(log n) Solution



