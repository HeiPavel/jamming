import React, {useState, useEffect} from 'react';
import './App.css';
import AuthButton from '../AuthButton/AuthButton';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import {search, createPlaylist, getUserPlaylists, getPlaylistTracks, updatePlaylist} from '../util/Spotify';

function App() {
  const [authorizeCheck, setAuthorizeCheck] = useState(false);  // To check if we Log in
  const [searchResults, setSearchResults] = useState([]);  // To store tracks for Result module
  const [playlistName, setPlaylistName] = useState('New Playlist');  // Store playlist Name to save in new playlist
  const [playlistTracks, setPlaylistTracks] = useState([]);  //  Store tracks to add in new playlist
  const [checkCreatePlaylist, setCheckCreatePlaylist] = useState(false);  //  State to display Save playlist section and hide main section
  const [checkUpdatePlaylist, setCheckUpdatePlaylist] = useState(false);  // State to display Update playlist section and hide main section
  const [curentPlaylistArray, setCurentPlaylistArray] = useState([]);  //  Store curent playlist of the user
  const [curentPlaylistTracks, setCurentPlaylistTracks] =useState([]);  // Store list of track in the selected playlist to update this playlist
  const [openCurentPlaylistTracks, setOpenCurentPlaylistTracks] = useState(false);  // State to display selected playlist tracks to update them and hide section with current user playlists
  const [curentPlaylistName, setCurentPlaylistName] = useState('');  //  Saving name of the selected playlist
  const [curentPlaylistId, setCurentPlaylistId] = useState('');  // To hold playlist ID for PUT requst to update playlist
  const [loading, setLoading] = useState(false);  // State to display or hide loading module 
  const [noMatchMessage, setNoMatchMessage] = useState(false);  // State to display or hide the message in case searching didn't have results
// Check if user authorized
  useEffect(() => {
    if (window.location.href.includes('access_token')) {
      setAuthorizeCheck(true);
    }
  }, []);
// Open Save New playlist section
  const handleCreatePlaylistClick = () => {
    setCheckCreatePlaylist(true);
  };
// Open Update playlist section and displays current users playlists if authorized
  const handleUpdatePlaylistClick = async () => {
    if (checkUpdatePlaylist) {
      setCheckUpdatePlaylist(false);
    } else {
      if (authorizeCheck) {
        setCheckUpdatePlaylist(true);
        const usersPlaylists = await getUserPlaylists();
        setCurentPlaylistArray(usersPlaylists);
      }
    }
  };
// Open and request tracks from selected playlist to update tracks inside
  const handleOpenCurentPlaylistTracks = async (name, playlistId) => {
    if (openCurentPlaylistTracks) {
      setOpenCurentPlaylistTracks(false);
      setCurentPlaylistTracks([]);
      setCurentPlaylistName('');
      setCurentPlaylistId('');
    } else {
      setOpenCurentPlaylistTracks(true);
      setCurentPlaylistName(name);
      const curentPlaylistTracks = await getPlaylistTracks(playlistId);
      setCurentPlaylistTracks(curentPlaylistTracks);
      setCurentPlaylistId(playlistId);
    }
  };
// Back button action to clean data when back to main menu
  const handleBackToMainPlaylist = () => {
    setCheckCreatePlaylist(false);
    setPlaylistTracks([]);
    setPlaylistName('New Playlist');
  };
// Add tracks to playlist
  const addTrack = (track) => {
    if (checkCreatePlaylist) {
      const check = playlistTracks.every((song) => song.id !== track.id);
      if (check) {
        setPlaylistTracks((prev) => [...prev, track]);
      }
    }

    if (openCurentPlaylistTracks) {
      const check = curentPlaylistTracks.every((song) => song.id !== track.id);
      if (check) {
        setCurentPlaylistTracks((prev) => [...prev, track]);
      }
    }
  };
// Remove tracks from playlist
  const removeTrack = (track) => {
    if (checkCreatePlaylist) {
      let tracks = playlistTracks;
      tracks = tracks.filter((song) => song.id !== track.id);
      setPlaylistTracks(tracks);
    }

    if (openCurentPlaylistTracks) {
      let tracks = curentPlaylistTracks;
      tracks = tracks.filter((song) => song.id !== track.id);
      setCurentPlaylistTracks(tracks);
    }
  };
//  Update Name of the new playlist
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };
// Update selected playlist in the user spotify account by rewriting tracks in the playlist clear all data in connected states and back to prev menu
  const updateCurentPlaylist = async () => {
    const trackURIs = curentPlaylistTracks.map((song) => song.uri);
    await updatePlaylist(curentPlaylistId, trackURIs);
    setOpenCurentPlaylistTracks(false);
    const usersPlaylists = await getUserPlaylists();
    setCurentPlaylistArray(usersPlaylists);
    setCurentPlaylistTracks([]);
    setCurentPlaylistName('');
    setCurentPlaylistId('');
  };
// Save new playlist in user spotify account and clear all data in connected states
  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((song) => song.uri);
    createPlaylist(playlistName, trackURIs);
    setCheckCreatePlaylist(false);
    setPlaylistTracks([]);
    setPlaylistName('New Playlist');
  };
// Search tracks by term only if you authorized and inpute some term
  const searchTracks = async (artistName, songName) => {
    if (!(artistName || songName) || !authorizeCheck) {
      return;
    }
    if (searchResults.length) {
      setSearchResults([]);
    }
    if (loading) {
      setNoMatchMessage(false);
    } else {
      setLoading(true);
    }
    const response = await search(artistName, songName);
    // Remove songs with same uri/id to avoid errors with same key attributes
    const array = response.filter((element, index) => {
      return response.slice(index + 1, response.length).every(song => song.id !== element.id);
    });
    if (array.length) {
      setLoading(false);
    } else {
      setNoMatchMessage(true);
    }
    setSearchResults(array);
  };

    return (
      <div>
        <h1 translate="no">Ja<span className="highlight">mmm</span>ing</h1>
        <AuthButton />
        <div className="App">
          <SearchBar onSearch={searchTracks} />
          <div className="App-playlist">
            <SearchResults searchResults={searchResults} onAdd={addTrack} loading={loading} noMatchMessage={noMatchMessage} />
            <Playlist playlist={playlistName} 
                      playlistTracks={playlistTracks} 
                      onRemove={removeTrack} 
                      onNameChange={updatePlaylistName}
                      onSave={savePlaylist} 
                      handleBackToMainPlaylist={handleBackToMainPlaylist}
                      handleCreatePlaylistClick={handleCreatePlaylistClick}
                      checkCreatePlaylist={checkCreatePlaylist}
                      handleUpdatePlaylistClick={handleUpdatePlaylistClick}
                      checkUpdatePlaylist={checkUpdatePlaylist}
                      curentPlaylistArray={curentPlaylistArray}
                      curentPlaylistTracks={curentPlaylistTracks}
                      openCurentPlaylistTracks={openCurentPlaylistTracks}
                      handleOpenCurentPlaylistTracks={handleOpenCurentPlaylistTracks}
                      curentPlaylistName={curentPlaylistName}
                      updateCurentPlaylist={updateCurentPlaylist}
            />
          </div>
        </div>
      </div>
    );
}

export default App;
