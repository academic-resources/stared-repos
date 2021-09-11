import path from 'path';
import glob from 'glob';
import { transformFileSync } from 'babel-core';
import plugin from '../src';

describe('react-environment', () => {
  glob.sync(path.join(__dirname, 'fixtures/*.js')).forEach((filepath) => {
    it(`should ${path.basename(filepath)}`, () => {
      const actual = transformFileSync(filepath, {
        plugins: [plugin],
        presets: ['es2015', 'react']
      }).code;

      expect(actual).toMatchSnapshot();
    });
  });
});
