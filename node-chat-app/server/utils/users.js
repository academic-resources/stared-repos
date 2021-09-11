// add a user via addUser which takes id, name, room name

// removeUser method to add and remove users from the People list when they join or leave rooms
// will be rmoving users by socket id

// getUser method to fetch any given user. comes in handy for sending a message like in createMessage
// listener Want to access user name and room in order to fire off newMessage event.
// getUser takes in an id and returns the user object in the arry of objects

// getUserList method takes in room name, figures out which users are in that room, and returns
// an aray of names and prints those names to the client.

// class Person {
//     constructor(name, age) {
//         console.log(name, age);
//         this.name = name;
//         this.age = age;

//     }
//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }

// const me = new Person('Maria', 26);
// const description = me.getUserDescription();
// console.log(description);
// console.log('this.name', me.name);
// console.log('this.age', me.age);
[{
    id: '/#125674wjs',
    name: 'Maria',
    room: 'The Merlin Fans',
    data: 'typing'
}]

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room, data) {
        var user = {
            id,
            name,
            room,
            data
        };

        this.users.push(user);

        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0]
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = { Users };