"""Design a logger system that receive stream of messages along with its timestamps, each message should be
printed if and only if it is not printed in the last 10 seconds.
Given a message and a timestamp (in seconds granularity), return true if the message should be printed in the given
timestamp, otherwise returns false.
It is possible that several messages arrive roughly at the same time."""


class Logger(object):

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.time_index = {}

    def shouldPrintMessage(self, timestamp, message):
        """
        Returns true if the message should be printed in the given timestamp, otherwise returns false.
        If this method returns false, the message will not be printed.
        The timestamp is in seconds granularity.
        :type timestamp: int
        :type message: str
        :rtype: bool
        """
        if message in self.time_index:
            t = self.time_index[message]
            if timestamp - t >= 10:
                self.time_index[message] = timestamp
                return True
            else:
                return False
        else:
            self.time_index[message] = timestamp
            return True
