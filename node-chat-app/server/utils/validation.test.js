const expect = require('expect');
const { isRealString } = require('./validation');

// reject non-string values
// reject strings with only spaces
// should allow strings with non-space characters
describe('isRealString', () => {
    it('should reject non-string values', () => {
        var res = isRealString(62);
        expect(res).toBe(false);
    })
    it('should reject strings with only spaces', () => {
        var res = isRealString('  ');
        expect(res).toBe(false);
    })
    it('should allow strings with non-space characters', () => {
        var res = isRealString('Maria');
        expect(res).toBe(true);
    })
})