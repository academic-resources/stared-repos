const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id')
    this.followState = this.$el.data('initial-follow-state')
    this.render();
    this.$el.on('click', this.handleClick.bind(this));
  }

  render () {
    switch (this.followState) {
      case 'unfollowed':
        this.$el.text('Follow!');
        this.$el.prop('disabled', false)
        break;
      case 'followed':
        this.$el.text('Unfollow!');
        this.$el.prop('disabled', false)
        break;
      case 'unfollowing':
        this.$el.prop('disabled', true)
        this.$el.text('unfollowing')
        break;
      case 'following':
        this.$el.prop('disabled', true)
        this.$el.text('following')
        break;
    }
  }

    // if (this.followState === 'unfollowed') {
    //   this.$el.text('Follow!')
    // } else {
    //   this.$el.text('Unfollow!')
    // }
  

  handleClick (event) {
    event.preventDefault();
    if (this.followState === 'unfollowed') {
      this.followState = 'following';
      this.render();
      APIUtil.followUser(this.userId).then(() => {
        this.followState = 'followed';
        this.render();
      });
    } else {
      this.followState = 'unfollowing'
      this.render();
      APIUtil.unfollowUser(this.userId).then(() => {
        this.followState = 'unfollowed';
        this.render();
      });
    }
  }
}



module.exports = FollowToggle