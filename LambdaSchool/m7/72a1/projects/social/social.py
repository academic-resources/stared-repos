from util import Queue
import random

class User:
    def __init__(self, name):
        self.name = name

class SocialGraph:
    def __init__(self):
        self.last_id = 0
        self.users = {}
        self.friendships = {}

    def add_friendship(self, user_id, friend_id):
        """
        Creates a bi-directional friendship
        """
        if user_id == friend_id:
            print("WARNING: You cannot be friends with yourself")
        elif friend_id in self.friendships[user_id] or user_id in self.friendships[friend_id]:
            print("WARNING: Friendship already exists")
        else:
            self.friendships[user_id].add(friend_id)
            self.friendships[friend_id].add(user_id)

    def add_user(self, name):
        """
        Create a new user with a sequential integer ID
        """
        self.last_id += 1  # automatically increment the ID to assign the new user
        self.users[self.last_id] = User(name)
        self.friendships[self.last_id] = set()

    def populate_graph(self, num_users, avg_friendships):
        """
        Takes a number of users and an average number of friendships
        as arguments

        Creates that number of users and a randomly distributed friendships
        between those users.

        The number of users must be greater than the average number of friendships.

        """

        # Reset graph
        self.last_id = 0
        self.users = {}
        self.friendships = {}

        # Add_users:  Create a new user with a sequential integer ID
        # Create_friendships:  Creates a bi-directional friendship

        # add # of users
        for x in range(0, num_users):
            self.add_user(f"User ID No. {x}")

        # create empty friendships container 
        friendships = []

        # get users & most recent available user id
        users = self.users
        most_recent_available_id = self.last_id + 1
        
        # loop through users and friends to add friendships
        for user in users:
            for friend in range(user + 1, most_recent_available_id):
                friendships.append((user, friend))

        # randomize friendships
        random.shuffle(friendships)

        # friendships are bidirectional; only need to add half
        friendships_added = (num_users * avg_friendships) // 2

        # loop through number of friendships "needed" and add friendship
        for x in range(friendships_added):
            self.add_friendship(friendships[x][0], friendships[x][1])
            

    def get_all_social_paths(self, user_id):
        """
        Takes a user's user_id as an argument

        Returns a dictionary containing every user in that user's
        extended network with the shortest friendship path between them.

        The key is the friend's ID and the value is the path.
        """

        # Add_users:  Create a new user with a sequential integer ID
        # Create_friendships:  Creates a bi-directional friendship

        visited = {}  # Note that this is a dictionary, not a set
        
        # create empty friendships map/queue
        friendships_map = Queue()

        # add specified user to map/queue
        friendships_map.enqueue([user_id])

        # while map is not empty:
        while friendships_map.size() > 0:

            # get first user to traverse from
            traversing_path = friendships_map.dequeue()

            # get user to traverse to
            new_user = traversing_path[-1]

            # if user unvisited:
            if new_user not in visited:
                
                # add user to visited 
                visited[new_user] = traversing_path

                # add that user's unvisited friends to new path & friendships map/queue
                for friend in self.friendships[new_user]:
                    if friend not in visited:
                        new_path = list(traversing_path)
                        new_path.append(friend)
                        friendships_map.enqueue(new_path)

        return visited


if __name__ == '__main__':
    sg = SocialGraph()
    sg.populate_graph(10, 2)
    print(sg.friendships)
    connections = sg.get_all_social_paths(1)
    print(connections)
