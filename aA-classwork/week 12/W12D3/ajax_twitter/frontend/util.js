const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js')

const APIUtil = {
    followUser: id => {
        return $.ajax({
            method: 'POST',
            url: `/users/${id}/follow`,
            dataType: 'json',
        })
    },

    unfollowUser: id => {
        return $.ajax({
            url: `/users/${id}/follow`,
            method: 'DELETE',
            dataType: 'json',
        })
    },

    searchUsers: (queryVal) => {
        return $.ajax({
            url: '/users/search',
            method: 'GET',
            dataType: 'json',
            data: { query: queryVal },
        })
    }

}


module.exports = APIUtil;