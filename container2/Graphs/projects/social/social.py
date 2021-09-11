import random
import time
import math

class Queue():
    def __init__(self):
        self.queue = []
    def enqueue(self, value):
        self.queue.append(value)
    def dequeue(self):
        if self.size() > 0:
            return self.queue.pop(0)
        else:
            return None
    def size(self):
        return len(self.queue)

class User:
    def __init__(self, name):
        self.name = name

class SocialGraph:
    def __init__(self):
        self.lastID = 0
        self.users = {}
        self.friendships = {}

    def __repr__(self):
        return f"Friendships: {self.friendships}"

    def addFriendship(self, userID, friendID):
        """
        Creates a bi-directional friendship
        """
        if userID == friendID:
            print("WARNING: You cannot be friends with yourself")
        elif friendID in self.friendships[userID] or userID in self.friendships[friendID]:
            print("WARNING: Friendship already exists")
        else:
            self.friendships[userID].add(friendID)
            self.friendships[friendID].add(userID)

    def addUser(self, name):
        """
        Create a new user with a sequential integer ID
        """
        self.lastID += 1  # automatically increment the ID to assign the new user
        self.users[self.lastID] = User(name)
        self.friendships[self.lastID] = set()

    def populateGraph(self, numUsers, avgFriendships):
        """
        Takes a number of users and an average number of friendships
        as arguments
        Creates that number of users and a randomly distributed friendships
        between those users.
        The number of users must be greater than the average number of friendships.
        """
        # Reset graph
        self.lastID = 0
        self.users = {}
        self.friendships = {}

        # Add users
        for i in range(numUsers):
            self.addUser(f"User {i + 1}")

        # Create friendships
        possibleFriendships = []
        for userID in self.users:
            for friendID in range(userID + 1, self.lastID +1):
                possibleFriendships.append((userID, friendID))
        
        random.shuffle(possibleFriendships)
        
        debug_addFriendshipCounter = 0
        for i in range(0, math.floor((numUsers * avgFriendships) // 2)):
            friendship = possibleFriendships[i]
            self.addFriendship(friendship[0], friendship[1])
            debug_addFriendshipCounter += 1
        
        print(f"Time addFriendship was called: {debug_addFriendshipCounter}.")

    def getAllSocialPaths(self, userID):
        """
        Takes a user's userID as an argument
        Returns a dictionary containing every user in that user's
        extended network with the shortest friendship path between them.
        The key is the friend's ID and the value is the path.
        """
        visited = {}  # Note that this is a dictionary, not a set

        q = Queue()
        q.enqueue( [userID] )

        while q.size() > 0:
            path = q.dequeue()
            friend = path[-1]

            if friend not in visited:
                visited[friend] = path

                for second_friend in self.friendships[friend]:
                    if second_friend not in visited:
                        path_copy = list(path)
                        path_copy.append(second_friend)
                        q.enqueue(path_copy)

        debug_friendship = 0
        for key in visited:
            debug_friendship += len(visited[key])
        
        return f"Average degree of separation: {debug_friendship - 1} // {len(visited)} = {(debug_friendship - 1) // len(visited)}. Number in extended network: {len(visited)}"

if __name__ == '__main__':
    sg = SocialGraph()
    # sg.populateGraph(10, 2)
    sg.populateGraph(1000, 5)
    # print(sg.friendships)
    connections = sg.getAllSocialPaths(1)
    print(connections)