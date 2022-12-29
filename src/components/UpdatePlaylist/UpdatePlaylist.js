import React, {useEffect} from 'react';
import './UpdatePlaylist.css';
import CurentPlaylist from '../CurentPlaylist/CurentPlaylist';
import TrackList from '../TrackList/TrackList';

function UpdatePlaylist(props) {

    const renderCurentPlaylists = () => {
        return props.curentPlaylistArray.map((playlist) => {
            return <CurentPlaylist key={playlist.id} playlist={playlist} onClick={props.handleOpenCurentPlaylistTracks} />
        });
    };

    useEffect(() => {
        const playlistContainer = document.getElementsByClassName('update-container');
        const curentPlaylistTracks = document.getElementsByClassName('curent-playlist-tracks');
        if (props.openCurentPlaylistTracks) {
            playlistContainer[0].className = 'update-container hide';
            curentPlaylistTracks[0].className = 'curent-playlist-tracks';
        } else {
            curentPlaylistTracks[0].className = 'curent-playlist-tracks hide';
            playlistContainer[0].className = 'update-container';
        }
    }, [props.openCurentPlaylistTracks]);

    return (
      <div className="update-playlist-container">
        <div className="update-container hide">
            {renderCurentPlaylists()}
            <div className="update-button">
                <button className="playlist-button" onClick={props.backClick}>Back</button>
            </div>
        </div>
        <div className="curent-playlist-tracks hide">
            <h2 translate="no">{props.curentPlaylistName}</h2>
            <TrackList tracks={props.curentPlaylistTracks} onRemove={props.onRemove} isRemoval={true} />
            <div className="curent-playlist-buttons">
              <button className="playlist-button" onClick={props.updateCurentPlaylist} >Update playlist</button>
              <button className="playlist-button" onClick={props.handleOpenCurentPlaylistTracks}>Back</button>
            </div>
        </div>
      </div>
    );
};

export default UpdatePlaylist;