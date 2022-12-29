import React from 'react';
import './CurentPlaylist.css';

function CurentPlaylist(props) {
    
    const handleClick = () => {
        props.onClick(props.playlist.name, props.playlist.id);
    };

    return (
        <div className="curent-playlist">
            <div className="playlist-information" translate="no">
                <h3>{props.playlist.name}</h3>
                <p>Songs in playlist: {props.playlist.songs}</p>
            </div>
            <button className="curent-playlist-action" onClick={handleClick} >Update</button>
        </div>
    );
};

export default CurentPlaylist;