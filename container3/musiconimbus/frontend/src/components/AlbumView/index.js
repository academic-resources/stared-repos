import { useParams, Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as albumsActions from "../../store/albums";
import * as songsActions from "../../store/songs";
import SongContainer from "../SongContainer";
import AddSong from "../AddSong";
import "./AlbumView.css"

export default function Album({ sessionUser }) {
  const history = useHistory();
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const [userAlbum, setUserAlbum] = useState(false);
  const [addSong, setAddSong] = useState(false);
  const [editSong, setEditSong] = useState(false);
  const [buttonText, setButtonText] = useState("+ Add a Song");
  const [change, setChange] = useState(false);
  const [songToEdit, setSongToEdit] = useState(false);

  const album = useSelector(state => state.albums.currentAlbum);
  const artist = useSelector(state => state.albums.currentArtist);

  useEffect(() => {
    setUserAlbum(false);
    if (artist) {
      if (artist.id === sessionUser.id) setUserAlbum(true)
    }
  }, [artist, sessionUser]);

  useEffect(() => {
    const getAlbumInfo = async () => {
      try {
        await dispatch(albumsActions.getOneAlbum(albumId));
      }
      catch {
        history.push("/explore")
      }
    };
    getAlbumInfo();
    return () => {
      dispatch(albumsActions.cleanupAlbum())
    }
  }, [dispatch, albumId, change, history])


  const buttonClick = () => {
    setAddSong(!addSong);
    setEditSong(false);
    setSongToEdit(false);
    if (buttonText === "+ Add a Song") { setButtonText("- Add a Song")};
    if (buttonText === "- Add a Song") { setButtonText("+ Add a Song")};
  }

  const editSongInfo = async (e) => {

    await dispatch(songsActions.getOneSong(e.currentTarget.id))
      .then((res) => {
        setSongToEdit(res);
        if (buttonText === "+ Add a Song") { setButtonText("- Add a Song")};
        setAddSong(false);
        setAddSong(true);
        setEditSong(true);
    })
  }

  const editAlbum = (e) => {
    history.push(`/albums/${e.target.id}/edit`)
  }


  if (!sessionUser) return (
    <Redirect to="/" />
  );

  if (album) return (
    <div className="main">
      <div className="single-album__title--container">
        <h1 className="single-album__title">{album.title}</h1>
      </div>
      {artist && <h2 className="album__artist">{artist.artistName}</h2>}
      <div className="album__layout">
        <div className="album__content--left">
          {album.imageUrl && <img className="single-album__cover" alt="album cover art" src={album.imageUrl} />}
          {!album.imageUrl &&
            <div className="single-album__cover--placeholder-container">
              <i className="fas fa-compact-disc single-album__cover--placeholder album__cover "></i>
            </div>}
          {userAlbum &&
            <button id={album.id} className="btn btn--tertiary album-edit" type="button" onClick={editAlbum}>Edit Album</button>
          }
        </div>
        <div className="album__content--right">
          {album.description &&
            <>
              <h3 className="album__content--title">Album Description</h3>
              <p className="album__description">{album.description}</p>
            </>
          }
          <h3 className="album__content--title">Release Date</h3>
          <p className="album__description">{album.releaseDate}</p>
          <div className="song--layout">
            {userAlbum &&
              <button id="plus-button" className="btn btn--tertiary" type="button" onClick={buttonClick}>{buttonText}</button>
            }
            <h3 className="album__content--title">Songs</h3>
            {album && Object.values(album.Songs).map(song => {
              return (
                <div className="song-container" key={song.id}>
                  <SongContainer album={album} sessionUser={sessionUser} song={song} change={change} setChange={setChange} />
                  {userAlbum && <button className="edit-button" onClick={editSongInfo} id={song.id} ><i className="fas fa-edit"></i></button>}
                </div>
                )
              })
            }
          </div>
          <div className="add-song">
            {addSong && (
              <>
                <AddSong
                  buttonClick={buttonClick}
                  change={change}
                  setChange={setChange}
                  setAddSong={setAddSong}
                  album={album}
                  editSong={editSong}
                  setEditSong={setEditSong}
                  songToEdit={songToEdit}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <h1>loading...</h1>
  )
}
