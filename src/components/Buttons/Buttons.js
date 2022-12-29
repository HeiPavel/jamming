import React from 'react';
import './Buttons.css';

function Buttons(props) {
    return (
        <div className="button-container">
          <h2>Create or update playlist</h2>
          <div className="buttons">
            <button className="playlist-button" onClick={props.createClick}>Creat Playlist</button>
            <button className="playlist-button" onClick={props.updateClick}>Update Playlist</button>
          </div>
        </div>
    );
};

export default Buttons;