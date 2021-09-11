import AudioPlayer, { RHAP_UI }  from 'react-h5-audio-player';
import { useDispatch } from "react-redux";
import { play } from "../../store/nowPlaying"
import 'react-h5-audio-player/lib/styles.css';
import "./AudioPlayer.css"

export default function MyAudioPlayer({ nowPlaying }) {
  const album = nowPlaying.Album
  const dispatch = useDispatch();

  const playNext = () => {
    if (album) {
      const song = album.Songs.filter(song => song.id === nowPlaying.id)
      const index = album.Songs.indexOf(song[0])

      if (album.Songs[index+1]){
        dispatch(play(album.Songs[index + 1]))
      }
    }
  }

  const playPrevious = () => {
    if (album) {
      const song = album.Songs.filter(song => song.id === nowPlaying.id)
      const index = album.Songs.indexOf(song[0])

      if (album.Songs[index-1]){
        dispatch(play(album.Songs[index-1]))
      }
    }
  }

  return (
    <div className="player__container">
      {nowPlaying.Album &&
        <div className="song-info__container">
          <p className="song-info">{nowPlaying.title}</p>
          <p className="song-info">{nowPlaying.Composer.firstName} {nowPlaying.Composer.lastName}</p>
          <p className="song-info">{nowPlaying.Album.User.artistName} • <i>{nowPlaying.Album.title}</i></p>
        </div>}
      <AudioPlayer className="player"
        src={nowPlaying.songUrl}
        defaultCurrentTime="0:00" defaultDuration="0:00"
        layout="horizontal-reverse"
        customAdditionalControls={[]}
        customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
        customProgressBarSection={
          [
            RHAP_UI.CURRENT_TIME,
            <div>/</div>,
            RHAP_UI.DURATION,
            RHAP_UI.PROGRESS_BAR,
            // RHAP_UI.VOLUME,
          ]
        }
        // customVolumeControls={[]}
        showSkipControls={true}
        showJumpControls={false}
        autoPlay
        controls
        controlsList="nodownload"
        onEnded={e => playNext()}
        onClickNext={e => playNext()}
        onClickPrevious={e => playPrevious()}
      />
    </div>
  )
}
