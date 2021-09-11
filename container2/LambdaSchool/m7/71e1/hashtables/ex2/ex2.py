#  Hint:  You may not need all of these.  Remove the unused functions.
class Ticket:
    def __init__(self, source, destination):
        self.source = source
        self.destination = destination

returned_array = []
returned_list = []

def loop_tickets(tickets, destination, length):
    global returned_array

    while length > 0:
        for ticket in tickets:
            source = ticket.source
            if source == destination:
                # get new destination and add to returned array
                destination = ticket.destination
                returned_array.append(destination)
                if ticket.source == source:
                    # delete from tickets
                    tickets.remove(ticket)
                    length = len(tickets)
    return tickets


def reconstruct_trip(tickets, length):
    global returned_array
    destination = "NONE"
    for ticket in tickets:
        loop_tickets(tickets, destination, length)
    tickets = []
    returned_list = returned_array.copy()
    returned_array = []
    return returned_list