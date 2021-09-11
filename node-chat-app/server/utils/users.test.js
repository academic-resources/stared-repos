const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Maria',
            room: 'Twitter Chat',
            data: 'is typing!'
        }, {
            id: '2',
            name: 'Joe',
            room: 'Dev Chat',
            data: 'is typing!'
        }, {
            id: '3',
            name: 'Pam',
            room: 'Linkedin Chat',
            data: 'is typing!'
        }]
    })
    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Maria',
            room: 'The Merlin Fans',
            data: 'is typing!'
        }
        var resUser = users.addUser(user.id, user.name, user.room, user.data);
        // first users refers to users vairable, and second to the users array
        expect(users.users).toEqual([user]);
    })
    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    })
    it('should not remove a user', () => {
        var userId = '100';
        var user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    })
    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(userId).toBe(userId);
    })
    it('should not find user', () => {
        var userId = '100';
        var user = users.getUser(userId);
        expect(user).toNotExist();
    })
    it('should return names for Twitter Chat', () => {
        var userList = users.getUserList('Twitter Chat');
        expect(userList).toEqual(['Maria'])
    })
    it('should return names for Twitter Chat', () => {
        var userList = users.getUserList('Dev Chat');
        expect(userList).toEqual(['Joe'])
    })
})