import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from "react";
import * as userAlbumsActions from "../../store/userAlbums";
import AlbumContainer from "../AlbumContainer";

import "./Dashboard.css"

export default function Dashboard({ sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [change, setChange] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const userAlbums = useSelector(state => state.userAlbums);
  const userAlbumsArray = Object.values(userAlbums);


  useEffect(() => {
    const getAlbums = async () => {
      await dispatch(userAlbumsActions.getUserAlbums(sessionUser.id))
      .then(() => {
        setLoaded(true);
      })
    };
    getAlbums()
  }, [dispatch, sessionUser.id, change]);

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  const onClick = () => {
    history.push("/albums/new")
  }

  const editAlbum = (e) => {
    history.push(`/albums/${e.currentTarget.id}/edit`)
  }


  const deleteAlbum = async (e) => {
    await dispatch(userAlbumsActions.deleteOneAlbum(e.currentTarget.id))
    .then(() => {
      setChange((change) => !change);
    })
  };

 return (
    <div className="main">
      {loaded && !userAlbumsArray.length > 0 &&
        <div className="empty-dashboard vertical-center">
          <h1>Welcome, {sessionUser.firstName}!</h1>
          <h3>You haven't uploaded anything yet.</h3>
          <button className="btn btn--secondary get-started" onClick={onClick}>Get Started</button>
        </div>
      }
      {loaded && userAlbumsArray.length > 0 &&
        <div className="main__user-assets">
          <div className="title__container">
            <h2 className="title">Your Albums</h2>
            <button className="btn btn--secondary" onClick={onClick}>+ Add Album</button>
          </div>
          <div className="albums__layout">
            {userAlbumsArray.map(album => {
                return (
                  <div key={album.id} className="album__container">
                    <AlbumContainer album={album} />
                    <div className="album__container--buttons">
                    <button id={album.id} onClick={deleteAlbum} className="trash-can album__trash"><i className="fas fa-trash"></i></button>
                    <button id={album.id} onClick={editAlbum} className="trash-can album__trash"><i className="fas fa-edit"></i></button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    </div>
  )
}
