import { fetch } from "./csrf";

const LOAD_USER_ALBUMS = "userAlbums/LOAD_USER_ALBUMS"
const ADD_ALBUM = "userAlbums/ADD_ALBUM"
const DELETE_ALBUM = "userAlbums/DELETE_ALBUM"


export const loadAlbums = (albums) => {
  return { type: LOAD_USER_ALBUMS, albums };
};

export const addAlbum = (album) => {
  return { type: ADD_ALBUM, album}
}

export const deleteAlbum = (albumId) => {
  return { type: DELETE_ALBUM, albumId };
}

export const getUserAlbums = (userId) => async dispatch => {
  const res = await fetch(`/api/albums/user/${userId}`);
  dispatch(loadAlbums(res.data.albums));
};

export const createAlbum = (album) => async dispatch => {
  const { title, artistId, releaseDate, description, photo } = album;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("artistId", artistId);
  formData.append("releaseDate", releaseDate);
  formData.append("description", description);
  if (photo) formData.append("photo", photo);

  const res = await fetch(`/api/albums/new`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formData,
  });

  dispatch(addAlbum(res.data.album))
  return res;
}

export const updateAlbum = (album) => async dispatch => {
  const { title, artistId, releaseDate, description, photo, albumId } = album;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("artistId", artistId);
  formData.append("releaseDate", releaseDate);
  formData.append("description", description);
  if (photo) formData.append("photo", photo);

  const res = await fetch(`/api/albums/${albumId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formData,
  });

  dispatch(addAlbum(res.data.album))
  return res;
}

export const deleteOneAlbum = (albumId) => async dispatch => {
  const res = await fetch(`/api/albums/${albumId}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    dispatch(deleteAlbum(albumId));
    return res;
  }
}

const initialState = {};

export default function userAlbumsReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case LOAD_USER_ALBUMS: {
      action.albums.forEach(album => {
        updateState[album.id] = album;
      })
      return updateState;
    }
    case DELETE_ALBUM: {
      delete updateState[action.albumId];
      return updateState;
    }
    case ADD_ALBUM: {
      updateState[action.album.id] = action.album;
      return updateState;
    }
    // case UPDATE_ALBUM: {
    //   return {
    //     ...state,
    //     [action.item.id]: action.item,
    //   };
    // }
    default:
      return state;
  }
}
