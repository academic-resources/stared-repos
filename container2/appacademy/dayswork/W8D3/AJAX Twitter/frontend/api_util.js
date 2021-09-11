const APIUtil = {
  followUser: id =>
    $.ajax({
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: 'json'
    }),
  unfollowUser: id =>
    $.ajax({
      method: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: 'json'
    }),
  searchUsers: (queryVal, success) => {
    $.ajax({
      method: 'GET',
      url: `/users/search`,
      data: { query: queryVal },
      dataType: 'json',
      success: success
    })
  },
  createTweet: data =>
    $.ajax({
      method: 'POST',
      url: `/tweets`,
      data: data,
      dataType: 'json'
    })
}

module.exports = APIUtil
