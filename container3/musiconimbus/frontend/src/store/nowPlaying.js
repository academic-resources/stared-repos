import { fetch } from "./csrf";

export const SET_SONG = "nowPlaying/SET_SONG"

export const setSong = (song) => {
  return { type: SET_SONG, song };
};

export const play = (song) => async dispatch => {
  const res = await fetch(`/api/songs/${song.id}`);
  dispatch(setSong(res.data));
  return res;
};

const initialState = { song: {} };

export default function nowPlayingReducer(state = initialState, action) {
  let updateState = {...state}
  switch (action.type) {
    case SET_SONG:
      updateState = action.song
      return updateState;
    default:
      return state;
    }
}
