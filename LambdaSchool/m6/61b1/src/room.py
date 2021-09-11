# Implement a class to hold room information. This should have name and
# description attributes.


class Room:
    def __init__(self, room_name, room_description, n_to=None, e_to=None, s_to=None, w_to=None, items=None):
        self.room_name = room_name
        self.room_description = room_description
        self.n_to = n_to
        self.e_to = e_to
        self.s_to = s_to
        self.w_to = w_to
        self.items = []

    def Items(self):
        return self.items

    def ListItems(self):
        if self.items == []:
            print(f'There are no more items to be found in the {self.room_name}')
        for item in self.items:
            print(f'{self.room_name} contains an item, {item.item_name}')

    def AddItem(self, item):
        self.items.append(item)

    def ItemPickedUp(self, item):
        self.items = [x for x in self.items if x.item_name != item.item_name]

    def GetRoomKey(self, rooms, room_name):
        return list(rooms.keys())[list(rooms.values()).index(room_name)]

    def ItemNotFound(self, item):
        print(f'{item} was not found in this room.  Try picking up another item or searching for items again.')

