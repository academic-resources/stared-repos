from util import Stack, Queue, Graph
import random

class Player:
    def __init__(self, current_room, shortest_path=[], lowest_moves=2000, current_path=[], possible_rooms_current_path=None, current_traversal=None, last_direction=None, last_room=None, unvisited_rooms=None, number_rooms_in_world=None):
        self.current_room = current_room
        self.shortest_path = shortest_path
        self.lowest_moves = lowest_moves
        self.current_path = current_path
        self.possible_rooms_current_path = possible_rooms_current_path
        self.current_traversal = current_traversal
        self.last_direction = last_direction
        self.last_room = last_room
        self.unvisited_rooms = unvisited_rooms
        self.number_rooms_in_world = number_rooms_in_world

    def travel(self, direction, show_rooms=False):
        next_room = self.current_room.get_room_in_direction(direction)
        if next_room is not None:
            self.current_room = next_room
            if (show_rooms):
                next_room.print_room_description(self)
        else:
            print("You cannot move in that direction.")

    # travel in the opposite direction or return none
    def go_in_reverse_direction(self, direction):
        if direction == "s":
            return "n"
        elif direction == "n":
            return "s"
        elif direction == "w":
            return "e"
        elif direction == "e":
            return "w"
        return None

    # gets new direction and path to travel
    def get_direction_path(self, current_path):
        new_path = []
        # for each room in current path, for second room+:
        for x, room in enumerate(current_path):
            if x > 0:
                # set x-1 of current path as last room (previous room)
                self.last_room = current_path[x - 1]
                # for each direction in the last room's adjacent rooms
                for direction in self.possible_rooms_current_path[self.last_room]:
                    # if that direction = current room, append to new path
                    if self.possible_rooms_current_path[self.last_room][direction] == room:
                        new_path.append(direction)
        # return new path
        return new_path

    # for each direction in path, append to current_traversal (current path) and travel in that direction
    def travel_direction_path(self, current_traversal, path):

        for direction in path:
            current_traversal.append(direction)
            self.travel(direction)

    # find the shortest path by using a breadth-first search to find room with a `'?'` exit.
    def get_shortest_path(self):
        # create blank queue of paths to check
        paths_to_check = Queue()
        # add current room as first in queue
        paths_to_check.enqueue([self.current_room.id])
        # create blank set of visited rooms
        visited_rooms = set()
        # while paths to check queue has at least one path to check
        while paths_to_check.size() > 0:
            # remove current path you're checking from queue
            current_path = paths_to_check.dequeue()
            # get last room to check it
            room_to_check = current_path[-1]
            # if not in visited_rooms
            if room_to_check not in visited_rooms:
                # if one of its potential paths is unexplored, return that path
                if "?" in self.possible_rooms_current_path[room_to_check].values():
                    return current_path
                # add to visited rooms since we just checked it
                visited_rooms.add(room_to_check)
                # cycle through each of its adjacent rooms and add those to 'paths to check' queue
                for room in self.possible_rooms_current_path[room_to_check].values():
                    new_path = list(current_path)
                    new_path.append(room)
                    paths_to_check.enqueue(new_path)
        # return nothing
        return None

    # process for when there are unvisited rooms
    def process_unvisited_rooms(self):
        # randomly shuffle unvisited rooms
        random.shuffle(self.unvisited_rooms)
        # get first unvisited room & set to last direction
        direction = self.unvisited_rooms[0]
        self.last_direction = direction
        # add it to current traversal and current path
        self.current_traversal.push(direction)
        self.current_path.append(direction)
        # then travel in that direction
        self.travel(direction)
        
    # process for when there are no unvisited rooms
    def process_no_unvisited(self):
        # return shortest path to unexplored room
        current_shortest_path = self.get_shortest_path()
        # if it's not none
        if current_shortest_path is not None:
            # get the new direction & path to travel
            # for each direction in path, append to current_traversal (current path) and travel in that direction
            direction_path = self.get_direction_path(current_shortest_path)
            self.travel_direction_path(self.current_path, direction_path)
            # set last room as second to last path of shortest path to unexplored room
            self.last_room = current_shortest_path[-2]
            # set last direction as last direction of get_direction_path results
            self.last_direction = direction_path[-1]

    # get current room exits and add to possible rooms
    def process_current_room_not_in_possible(self):
        adjacents = dict()
        for exit in self.current_room.get_exits():
            adjacents[exit] = "?"
        self.possible_rooms_current_path[self.current_room.id] = adjacents

    # if last room exists, run this function:
    def last_room_exists(self):
        # set last room to current room's last direction in possible rooms
        self.possible_rooms_current_path[self.current_room.id][self.go_in_reverse_direction(
            self.last_direction)] = self.last_room
        # find its last direction in possible rooms and set that to current room
        self.possible_rooms_current_path[self.last_room][self.last_direction] = self.current_room.id

    # create potential traversal path
    def new_traversal_path(self):

        # reset current traversal path, possible rooms, and last room
        self.current_traversal = Stack()
        self.possible_rooms_current_path = dict()
        self.last_room = None

        # loop while number of possible rooms is less than number of rooms
        while len(self.possible_rooms_current_path) < self.number_rooms_in_world:

            # if current room not in possible rooms, set current adjacents as unvisited and add to possible rooms
            if self.current_room.id not in self.possible_rooms_current_path:
                self.process_current_room_not_in_possible()

            # if last room exists (none the first time):
            if self.last_room:
                self.last_room_exists()

            # set last room to current room
            self.last_room = self.current_room.id
            # create blank unvisited rooms list
            self.unvisited_rooms = list()

            # for each direction of current room in possible rooms, if unexplored, append to unvisited
            for direction, room in self.possible_rooms_current_path[self.current_room.id].items():
                if room == "?":
                    self.unvisited_rooms.append(direction)

            # if there are unvisited rooms:
            if len(self.unvisited_rooms) > 0:
                self.process_unvisited_rooms()
            # if there are no unvisited rooms:
            else:
                self.process_no_unvisited()
