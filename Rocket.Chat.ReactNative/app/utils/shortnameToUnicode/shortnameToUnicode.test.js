/* eslint-disable no-undef */
import shortnameToUnicode from './index';

test('render joy', () => {
	expect(shortnameToUnicode(':joy:')).toBe('π');
});

test('render several emojis', () => {
	expect(shortnameToUnicode(':dog::cat::hamburger::icecream::rocket:')).toBe('πΆπ±ππ¦π');
});

test('render unknown emoji', () => {
	expect(shortnameToUnicode(':unknown:')).toBe(':unknown:');
});

test('render empty', () => {
	expect(shortnameToUnicode('')).toBe('');
});

test('render text with emoji', () => {
	expect(shortnameToUnicode('Hello there! :hugging:')).toBe('Hello there! π€');
});

test('render ascii smile', () => {
	expect(shortnameToUnicode(':)')).toBe('π');
});

test('render several ascii emojis', () => {
	expect(shortnameToUnicode(':) :( -_- \':-D')).toBe('ππππ');
});

test('render text with ascii emoji', () => {
	expect(shortnameToUnicode('Hello there! :)')).toBe('Hello there!π');
});

test('render emoji and ascii emoji', () => {
	expect(shortnameToUnicode('\':-D :joy:')).toBe('π π');
});
