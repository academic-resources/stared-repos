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
    def __repr__(self):
        return self.name

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
            return False
        elif friendID in self.friendships[userID] or userID in self.friendships[friendID]:
            print("WARNING: Friendship already exists")
            return False
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
        # numUsers * average number of friendships is how many we should create
        # n = total users * average friendships / 2
    
        # First generate all possible friendships (if user 1 is friends with everyone, 2-10; then, user 2 doesn't need to add user 1, but 3 -10, etc.. until every possible friendship that could be created is generated)

        possibleFriendships = []
        for userID in self.users:
            # inclusive (start after ourselves) and exclusive (must make range go to one beyond our final to add)
            for friendID in range(userID + 1, self.lastID + 1):
                # this creates a list of all possible friendships without duplicates
                # these are tuples of two people who could be friends
                possibleFriendships.append((userID, friendID))
                # we can see how many this is by printing the length
                print(len(possibleFriendships))
        
        # let's randomize this list. random.shuffle() randomizes the list and returns None
        random.shuffle(possibleFriendships)

        for i in range(0, math.floor((numUsers * avgFriendships)//2)):
        friendship = possibleFriendships[i]
        # grabs person 1 and person 2 of the possible friendship tuples
        self.addFriendship(friendship[0], friendship[1])

        # alternate way to write it:

        # Now we need to actually create users and assign them friendships at random
        # random.sample(list, k) chooses k unique elements from list
        # friendshipsToCreate = random.sample(possibleFriendships, (numUsers * avgFriendships) // 2)

        # loop through possible friends and create the friendships
        # for friendship in friendshipsToCreate:
            # grabs person 1 and person 2 of the possible friendship tuples
            # self.addFriendship(friendship[0], friendship[1])

        # This results in roughly 2 average friendships per user, even though the friendships are randomly assigned (so some will have 3 or 4, and others only 1 or 2)

    def getAllSocialPaths(self, userID):
        """
        Takes a user's userID as an argument

        Returns a dictionary containing every user in that user's
        extended network with the shortest friendship path between them.

        The key is the friend's ID and the value is the path.
        """
        visited = {}

        q = Queue()
        q.enqueue( [userID] )

        while q.sizze() > 0:
            path = q.dequeue()
            newUserID = path[-1]

            if newUserID not in visited:
                visited[newUserID] = path

                for friendID in self.friendships[newUserID]:
                    if friendID not in visited:
                        new_path = list(path)
                        new_path.append(friendID)
                        q.enqueue(new_path)

if __name__ == '__main__':
    sg = SocialGraph()
    start_time = time.time()
    sg.populateGraph(10, 2)
    print(sg.friendships)
    end_time = time.time()
    connections = sg.getAllSocialPaths(1)
    print(f'Runtime: {end_time - start_time} seconds')
    print(connections)
