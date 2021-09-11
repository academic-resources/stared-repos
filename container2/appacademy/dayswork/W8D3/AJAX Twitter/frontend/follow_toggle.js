const APIUtil = require('./api_util.js')

class FollowToggle {
  constructor($el) {
    this.userId = $el.data('user-id')
    this.followState = $el.data('initial-follow-state')
    this.$el = $el
    this.render()
    $el.click(event => this.handleClick(event))
  }

  render() {
    if (this.followState === 'followed') {
      this.$el.text('Unfollow!')
    } else {
      this.$el.text('Follow!')
    }
  }

  handleClick(event) {
    event.preventDefault()
    if (this.followState === 'following' || this.followState === 'unfollowing')
      return
    if (this.followState === 'unfollowed') {
      this.followState === 'following'
      this.$el.prop('disabled', true)
      APIUtil.followUser(this.userId).then(
        () => {
          this.$el.prop('disabled', false)
          this.followState = 'followed'
          this.render()
        },
        () => {
          debugger
        }
      )
    } else {
      this.followState === 'unfollowing'
      this.$el.prop('disabled', true)
      APIUtil.unfollowUser(this.userId).then(
        () => {
          this.$el.prop('disabled', false)
          this.followState = 'unfollowed'
          this.render()
        },
        () => {
          debugger
        }
      )
    }
  }
}

module.exports = FollowToggle
