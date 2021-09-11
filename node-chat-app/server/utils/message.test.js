const expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // store res in variable
        // assert from match
        const from = 'Pam';
        // assert from text match
        const text = 'Some message';
        // assert createdAt is number
        const message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });
    })
})

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'Larry';
        const latitude = 15;
        const longitude = 19;
        const url = 'https://www.google.com/maps/search/?api=1&query15,19';
        const message = generateLocationMessage(from, latitude, longitude);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, url });
    })
})