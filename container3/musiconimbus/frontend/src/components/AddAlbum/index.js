import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as userAlbumsActions from "../../store/userAlbums";
import { play } from "../../store/nowPlaying"
import "./AddAlbum.css";

export default function AddAlbum() {
  const { albumId }= useParams()
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const album = useSelector(state => state.userAlbums[albumId]);
  const nowPlaying = useSelector(state => state.nowPlaying.song)
  const userAlbums = useSelector(state => state.userAlbums);
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState([]);
  const [editAlbum, setEditAlbum] = useState(false);
  const artistId = sessionUser.id;

  useEffect(() => {
    if (albumId && album) {
      setEditAlbum(true);
      setTitle(album.title);
      setReleaseDate(album.releaseDate);
      setDescription(album.description);
    }
  }, [albumId, album])

  useEffect(() => {
    dispatch(userAlbumsActions.getUserAlbums(sessionUser.id))
  }, [dispatch, sessionUser.id]);

  useEffect(() => {
    if (albumId && (Object.values(userAlbums).length > 0)) {
      if (!(albumId in userAlbums)) {
        history.push("/albums/new")
      }
    }
  }, [albumId, album, userAlbums, history])

  if (!sessionUser) return (
    <Redirect to="/" />
  );


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setReleaseDate(Number(releaseDate));

    if (!editAlbum) {
      let createdAlbum = await dispatch(userAlbumsActions.createAlbum({title, artistId, releaseDate, description, photo}))
        .catch((res) => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });

        if (createdAlbum) {
          history.push(`/albums/${createdAlbum.data.album.id}`);
        }
      } else {
        let updatedAlbum = await dispatch(userAlbumsActions.updateAlbum({title, artistId, releaseDate, description, photo, albumId}))
          .catch((res) => {
            if (res.data && res.data.errors) setErrors(res.data.errors);
          });

          if (updatedAlbum) {
            if (+nowPlaying.albumId === +albumId) {
              dispatch(play(nowPlaying))
            }
            history.push(`/albums/${updatedAlbum.data.album.id}`);
          }
      }
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(file);
  };

  return (
    <div className="main">
      {!editAlbum ? <h1>Add an Album</h1> : <h1>Edit Album</h1>}
      <form className="form form__album-create" onSubmit={handleSubmit}>
        {errors.length > 0 && <ul className="errors">
          {errors.map((error, idx) => <li className="errors--li" key={idx}>{error}</li>)}
        </ul>}
        <label htmlFor="title">
          Album Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="releaseDate">
          Release Date (Year)
        </label>
        <input
          id="releaseDate"
          type="text"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
        />
        <label htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="photo">
          Cover Photo
        </label>
        <input
          id="photo"
          type="file"
          className="input--photo"
          onChange={updateFile}
        />
        <div className="button-container">
        {!editAlbum ? <button type="submit" className="btn btn--primary">Create</button> :
        <button type="submit" className="btn btn--primary">Update</button>}
        </div>
      </form>
    </div>
  )
}
