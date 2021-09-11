# Write a class to hold player information, e.g. what room they are in
# currently.
class Player:
    def __init__(self, player_name, current_room, inventory=[]):
        self.player_name = player_name
        self.current_room = current_room
        self.inventory = inventory

    def Name(self):
        return self.player_name

    def CurrentRoomName(self):
        return self.current_room.room_name
    
    def CurrentRoomDescription(self):
        return self.current_room.room_description
    
    def MoveToRoom(self, room):
        self.current_room = room

    def ListInventory(self):
            print(
                f"{self.player_name} has the following items in their inventory:")
            for item in self.inventory:
                print(f"{item.item_name}")

    def AddInventoryItem(self, item):
        self.inventory.append(item)
        print(f"Added {item.item_name} to {self.player_name}'s inventory.")

    def DropInventoryItem(self, item):
        self.inventory = [x for x in self.inventory if x != item]

    def ItemDropped(self, item):
        print(f'You have dropped {item}.  It is no longer in your inventory.')

    def ItemFound(self, item):
        print(f'You have picked up {item}.')
