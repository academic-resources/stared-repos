const sanitize = require('sanitize-html');

module.exports = {
  allowedAttributes: {
    ...sanitize.defaults.allowedAttributes,
    img: ['src', 'alt']
  },
  allowedTags: [...sanitize.defaults.allowedTags, 'img']
};
