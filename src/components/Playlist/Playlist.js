import React, {useEffect} from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import Buttons from '../Buttons/Buttons';
import UpdatePlaylist from '../UpdatePlaylist/UpdatePlaylist';

function Playlist(props) {
    const handleNameChange = (event) => {
        props.onNameChange(event.target.value);
    };

    useEffect(() => {
        const playlist = document.getElementsByClassName('playlist-container');
        const buttons = document.getElementsByClassName('button-container');
        const updatePlaylist = document.getElementsByClassName('update-container');
        if (props.checkCreatePlaylist) {
            playlist[0].className = 'playlist-container';
            buttons[0].className = 'button-container hide';
        } else {
            if (!props.checkUpdatePlaylist) {
              playlist[0].className = 'playlist-container hide';
              buttons[0].className = 'button-container';
            }
        }

        if (props.checkUpdatePlaylist) {
            updatePlaylist[0].className = 'update-container';
            buttons[0].className = 'button-container hide';
        } else {
            if (!props.checkCreatePlaylist) {
              updatePlaylist[0].className = 'update-container hide';
              buttons[0].className = 'button-container';
            }
        }
    }, [props.checkCreatePlaylist, props.checkUpdatePlaylist]);

        return (
            <div className="Playlist">
              <Buttons createClick={props.handleCreatePlaylistClick} updateClick={props.handleUpdatePlaylistClick} />
              <UpdatePlaylist 
                      backClick={props.handleUpdatePlaylistClick} 
                      curentPlaylistArray={props.curentPlaylistArray}
                      curentPlaylistTracks={props.curentPlaylistTracks}
                      onRemove={props.onRemove} 
                      openCurentPlaylistTracks={props.openCurentPlaylistTracks}
                      handleOpenCurentPlaylistTracks={props.handleOpenCurentPlaylistTracks}
                      curentPlaylistName={props.curentPlaylistName}
                      updateCurentPlaylist={props.updateCurentPlaylist}
              />  
              <div className="playlist-container hide">
                <input value={props.playlist} onChange={handleNameChange} />
                <TrackList tracks={props.playlistTracks} onRemove={props.onRemove} isRemoval={true} />
                <div className="buttons">
                  <button className="playlist-button" onClick={props.onSave}>Save to Spotify</button>
                  <button className="playlist-button" onClick={props.handleBackToMainPlaylist}>Back</button>
                </div>
              </div>
            </div>
        );
}

export default Playlist;