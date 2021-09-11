import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { play } from "../../store/nowPlaying"
import * as songsActions from "../../store/songs";
import "./AddSong.css"

export default function AddSong({ setChange, setAddSong, album, buttonClick, editSong, setEditSong, songToEdit }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(songToEdit ? songToEdit.song.title : '');
  const [composerId, setComposerId] = useState(songToEdit ? songToEdit.song.composerId : 'Please select a composer');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [song, setSong] = useState(null);
  const [errors, setErrors] = useState([]);
  const albumId = album.id;

  const {composers, allComposers} = useSelector(state => state.songs)
  const nowPlaying = useSelector(state => state.nowPlaying.song)

  useEffect(() => {
    dispatch(songsActions.getComposers())
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!editSong) {
      await dispatch(songsActions.createSong({title, albumId, composerId, firstName, lastName, song}))
        .then(() => {
          setTitle('');
          setComposerId('Please select a composer');
          setFirstName('');
          setLastName('');
          setSong(null);
          setAddSong(false);
          setChange((change) => !change);
          buttonClick();
        })
        .catch((res) => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
      } else {
        await dispatch(songsActions.editSong({title, composerId, firstName, lastName, songToEdit}))
        .then(() => {
          setTitle('');
          setComposerId('Please select a composer');
          setFirstName('');
          setLastName('');
          setSong(null);
          setAddSong(false);
          setEditSong(false);
          setChange((change) => !change);
          buttonClick();
          if (songToEdit.song.id === nowPlaying.id) {
            dispatch(play(songToEdit.song));
          }
        })
        .catch((res) => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    }
  }

  const closeDiv = () => {
    setTitle('');
    setComposerId('Please select a composer');
    setFirstName('');
    setLastName('');
    setSong(null);
    setAddSong(false);
    setEditSong(false);
    setChange((change) => !change);
    buttonClick();
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setSong(file);
  };

  if (allComposers) return (
    <>
      <div className="add-song__title-container">
        {!editSong ? <h3 className="add-song__title">Add a song to your album:</h3> :
        <h3 className="add-song__title">Edit song:</h3>}
        <button type="button" className="x" onClick={closeDiv}><i className="fas fa-times"></i></button>
      </div>
      <form className="form__song" onSubmit={handleSubmit}>
        {errors.length > 0 && <ul className="errors">
          {errors.map((error, idx) => <li className="errors--li" key={idx}>{error}</li>)}
        </ul>}
        <label htmlFor="title">
          Song Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="composerId">
          Composer
        </label>
        <p className="form__label--subheader">If your composer isn't listed, please add them to our database.</p>
        <select
          id="composerId"
          value={composerId}
          onChange={(e) => {
            setComposerId(e.target.value)
            setFirstName('')
            setLastName('')
            }
          }
        >
          <option defaultValue>Please select a composer</option>
          <option></option>
          <option value=''>ADD NEW COMPOSER</option>
          {allComposers.map(composerId =>
            <option value={composerId} key={composerId}>
              {composers[composerId].lastName && `${composers[composerId].lastName}, `}{composers[composerId].firstName}
            </option>
            )
          }
        </select>
        {composerId==="" &&
          <>
            <label htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">
              Last Name (optional)
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        }
        {!editSong &&
          <>
            <label htmlFor="song">
              Upload Track
            </label>
            <input
              id="song"
              type="file"
              className="input--song"
              onChange={updateFile}
              required
            />
          </>
        }
        <div className="button-container">
          {!editSong ? <button type="submit" className="btn btn--secondary">Upload</button>
          : <button type="submit" className="btn btn--secondary">Update</button>}
        </div>
      </form>
    </>
  )
  return (
    <h3>loading...</h3>
  )
}
