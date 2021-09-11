const FollowToggle = require('./follow_toggle')
const UserSearch = require('./users_search')
const TweetCompose = require('./tweet_compose')

$(() => {
  $('.follow-toggle').each((i, el) => {
    new FollowToggle($(el))
  })

  $('.users-search').each((i, el) => {
    new UserSearch($(el))
  })

  $('.tweet-compose').each((i, el) => {
    new TweetCompose($(el))
  })
})
