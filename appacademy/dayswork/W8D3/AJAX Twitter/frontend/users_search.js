const APIUtil = require('./api_util')
const FollowToggle = require('./follow_toggle')

class UsersSearch {
  constructor($el) {
    this.$el = $el
    this.$input = $el.find('input')
    this.$ul = $el.find('.users')
    this.$input.on('input', this.handleInput.bind(this))
  }

  handleInput(event) {
    // debugger
    APIUtil.searchUsers(
      event.currentTarget.value,
      this.processUsersFound.bind(this)
    )
  }

  processUsersFound(data) {
    this.$ul.find('li').remove()
    debugger
    data.forEach((el, i) => {
      const uname = el.username
      const uid = el.id
      const follow_state = el.followed ? 'followed' : 'unfollowed'
      const $li = $(`<li><a href="/users/${uid}">${uname}</a></li>`)
      const $btn = $(
        `<button data-user-id=${uid} data-initial-follow-state=${follow_state} class="follow-toggle" ></button >`
      )
      new FollowToggle($btn)
      $li.append($btn)
      this.$ul.append($li)
    })
  }
}

module.exports = UsersSearch
