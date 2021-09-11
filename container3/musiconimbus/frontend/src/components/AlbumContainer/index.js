import { Link } from "react-router-dom";
import "./AlbumContainer.css"

export default function AlbumContainer({ album, artist }) {
  return (
    <Link to={`/albums/${album.id}`}>
      <div className="container" >
        <h2 className="album__title">{album.title}</h2>
        {album.imageUrl && <img src={album.imageUrl} alt="album cover" className="album__cover"/>}
        {!album.imageUrl && <i className="fas fa-compact-disc album__cover album__cover--placeholder"></i>}
        {artist && <h3 className="artist">{artist.artistName}</h3>}
      </div>
    </Link>
  )
}
