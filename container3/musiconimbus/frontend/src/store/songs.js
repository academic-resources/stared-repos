import { fetch } from "./csrf";

const LOAD_ALL_SONGS = "songs/LOAD_ALL_SONGS"
const LOAD_ONE_SONG = "songs/LOAD_ONE_SONG"
const LOAD_ALL_COMPOSERS = "songs/LOAD_ALL_COMPOSERS"
const ADD_SONG = "songs/ADD_SONG"
const DELETE_SONG = "songs/DELETE_SONG"


export const loadSongs = (songs) => {
  return { type: LOAD_ALL_SONGS, songs };
};

export const loadOneSong = (data) => {
  return { type: LOAD_ONE_SONG, data };
}

export const addSong = (song) => {
  return { type: ADD_SONG, song };
}

export const deleteSong = (songId) => {
  return { type: DELETE_SONG, songId };
}

export const loadComposers = (composers) => {
  return { type: LOAD_ALL_COMPOSERS, composers };
}

export const getSongs = () => async dispatch => {
  const res = await fetch(`/api/songs/`);
  dispatch(loadSongs(res.data.songs));
};

export const getOneSong = (songId) => async dispatch => {
  const res = await fetch(`/api/songs/${songId}`);

  dispatch(loadOneSong(res.data));
  return res.data;
}

export const createSong = (newSong) => async dispatch => {
  const { title, albumId, composerId, firstName, lastName, song } = newSong;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("albumId", albumId);
  if (composerId.length) formData.append("composerId", composerId);
  if (firstName.length) formData.append("firstName", firstName);
  if (lastName.length) formData.append("lastName", lastName);
  formData.append("song", song);

  const res = await fetch(`/api/songs/new`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formData,
  });

  dispatch(addSong(res.data.song))
  return res.data;
}

export const editSong = (song) => async dispatch => {
  const { title, composerId, firstName, lastName, songToEdit } = song;

  const res = await fetch(`/api/songs/${songToEdit.song.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      title,
      composerId,
      firstName,
      lastName,
    }),
  });

  dispatch(addSong(res.data.song))
  return res.data;
}

export const deleteOneSong = (songId) => async dispatch => {
  const res = await fetch(`/api/songs/${songId}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    dispatch(deleteSong(songId));
    return res;
  }
}

export const getComposers = () => async dispatch => {
  const res = await fetch(`/api/composers/`);
  dispatch(loadComposers(res.data.composers))
}



const initialState = { allComposers: [], composers: {} };

export default function songsReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case LOAD_ALL_SONGS: {
      action.songs.forEach(song => {
        updateState[song.id] = song;
      })
      return updateState;
    }
    case LOAD_ONE_SONG: {
      updateState.current = action.data.song;
      return updateState;
    }
    case LOAD_ALL_COMPOSERS: {
      updateState.allComposers = [];
      action.composers.forEach(composer => {
        updateState.composers[composer.id] = composer;
        updateState.allComposers.push(composer.id);
      })
      return updateState;
    }
    case ADD_SONG: {
      updateState[action.song.id] = action.song;
      return updateState;
    }
    case DELETE_SONG: {
      delete updateState[action.songId];
      return updateState;
    }
    default:
      return state;
  }
}
