import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar(props) {
    const [artistName, setArtistName] = useState('');
    const [songName, setSongName] = useState('');

    const handleArtistNameChange = (event) => {
        setArtistName(event.target.value.trim());
    };

    const handleSongNameChange = (event) => {
        setSongName(event.target.value.trim());
    }

    const search = () => {
        props.onSearch(artistName, songName);
    };

    const handleKeyDown = (event) => {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            props.onSearch(artistName, songName);
        }
    };

    return (
        <div className="SearchBar" onKeyDown={handleKeyDown}>
            <input placeholder="Enter artist" onChange={handleArtistNameChange} />
            <input placeholder="Enter song" onChange={handleSongNameChange} />
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    );
}

export default SearchBar;