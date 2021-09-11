import axios from 'axios';

export const GET_FRIENDS = 'GET_FRIENDS';
export const ADD_FRIEND = 'ADD_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';

export const getFriends = () => {
  const promise = axios.get('http://localhost:5000/friends');
  return {
    type: GET_FRIENDS,
    payload: promise
  };
};

export const addFriend = data => {
  const promise = axios.post('http://localhost:5000/new-friend', data);
  return {
    type: ADD_FRIEND,
    payload: promise
  };
};

export const removeFriend = index => {
  const promise = axios.delete('http://localhost:5000/delete-friend', {
    data: {
      index
    }
  });
  return {
    type: REMOVE_FRIEND,
    payload: promise
  };
};
