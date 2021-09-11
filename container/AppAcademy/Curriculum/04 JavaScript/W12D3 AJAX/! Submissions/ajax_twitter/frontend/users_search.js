// const APIUtil = require('./api_util');
const APIUtil = require('./util')
const FollowToggle = require('./follow_toggle')


class UsersSearch {
    constructor(el) {
        this.$el = $(el)
        this.$input = $('#search-input')
        this.$ul = $('.users')
        this.$el.on('keyup', this.handleInput.bind(this))
    }

    handleInput(event) {
      // event.preventDefault()
      const val = this.$input.val();
      const success = (res) => {
        this.renderResults(res);
      }
      APIUtil.searchUsers(val).then(success)
    } 

    renderResults(res) {
      this.$ul.empty();
      const users = res.map((el) => (el.username))
      users.forEach( (user, i) => {
        const $li = $('<li>');
        const $a = $('<a>').text(user);
        $a.attr('href',`/users/${res[i].id}`);
        $li.append($a);
        this.$ul.append($li)
        const $button = $('<button>')
        // const follow = new FollowToggle($button)
        this.$ul.append($button)
      });
    }
}

module.exports = UsersSearch