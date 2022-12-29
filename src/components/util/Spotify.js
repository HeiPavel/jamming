let userToken;
const clientID = process.env.REACT_APP_CLIENT_ID;
const redirectURI = process.env.REACT_APP_REDIRECT_URI;
const urlToFetch = 'https://api.spotify.com/v1';

    export const authorization = () => {
        const link = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        if (!window.location.href.includes('access_token') && !userToken) {
            window.location = link;
        }
    };

    const getAccessToken = () => {
        if (userToken) {
            return userToken;
        } 
        const userTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expireTokenMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (userTokenMatch && expireTokenMatch) {
            userToken = userTokenMatch[1];
            const expireTime = Number(expireTokenMatch[1]);
            window.setTimeout(() => userToken = '', expireTime * 1000);
            window.history.pushState('Access Token', null, '/');
            return userToken;
        }
    };

    const searchByTerm = async (artistName, songName, offset, obj) => {
        let term ='';
        if (artistName && songName) {
            term = `${artistName} ${songName}`;
        } else {
            if (artistName) {
                term = artistName;
            } else {
                term = songName;
            }
        }
        const queryString = `/search?q=${term}&type=track&limit=50`;
        const offsetString = `&offset=${offset}`;
        const url = `${urlToFetch}${queryString}${offsetString}`;
        try {
            const response = await fetch(url, obj);
            if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                };
            }); 
        }
        } catch(error) {
            console.log(error)
        }
    };

    export const search = async (artistName, songName) => {
        const array = [];
        let offset = 0;
        const accessToken = getAccessToken();
        const headerObj = {
            headers: {Authorization: `Bearer ${accessToken}`}
        };
        while(array.length <= 200 && offset <= 750) {
            const response = await searchByTerm(artistName, songName, offset, headerObj);
                const sort = response.filter(element => {
                    if (artistName) {
                        return (element.artist.toLowerCase().includes(artistName.toLowerCase()));
                    } else {
                        return (element.name.toLowerCase().includes(songName.toLowerCase()));
                    }
                });
            array.push(...sort);
            if ((artistName && songName) && (array.length >= 100 || offset >= 150)) {
                break;
            }
            if (songName && offset >= 350) {
                break;
            }
            offset += 50;
        }
        return array;
    };

    const getUserId = async () => {
        const accessToken = getAccessToken();
        const headerObj = {
            headers: {Authorization: `Bearer ${accessToken}`}
        };
        const queryString = '/me';
        const url = `${urlToFetch}${queryString}`;
        try {
            const response = await fetch(url, headerObj);
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.id;
            }
        } catch(error) {
            console.log(error);
        }
    };

    const getPlaylistId = async (playlistName) => {
        const accessToken = getAccessToken();
        const headerObj = {
            headers: {Authorization: `Bearer ${accessToken}`}
        };
        const userID = await getUserId();
        const queryString = `/users/${userID}/playlists`;
            const url = `${urlToFetch}${queryString}`;
            const obj = {
            method: 'POST',
            headers: headerObj.headers,
            body: JSON.stringify({
                name: playlistName
                })
            };
        try {
            const response = await fetch(url, obj);
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.id;
            }
        } catch(error) {
            console.log(error);
        } 
    };

    export const createPlaylist = async (playlistName, uriArray) => {
        if (!playlistName || !uriArray.length) {
            return;
        }
        const accessToken = getAccessToken();
        const headerObj = {
            headers: {Authorization: `Bearer ${accessToken}`}
        };
        const userID = await getUserId();
        const playlistID = await getPlaylistId(playlistName);
        const queryString = `/users/${userID}/playlists/${playlistID}/tracks`;
        const url = `${urlToFetch}${queryString}`;
        const obj = {
            method: 'POST',
            headers: headerObj.headers,
            body: JSON.stringify({
                    uris: uriArray
                })
            };
        try {
            await fetch(url, obj);
        } catch(error) {
            console.log(error);
        }
    };

    export const getUserPlaylists = async () => {
        const userID = await getUserId();
        const accessToken = getAccessToken();
        const headerObj = {
            headers: {Authorization: `Bearer ${accessToken}`}
        };
    const queryString = `/users/${userID}/playlists`;
    const url = `${urlToFetch}${queryString}`;
    try {
        const response = await fetch(url, headerObj);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.items.map((playlist) => {
                return {
                    name: playlist.name,
                    id: playlist.id,
                    songs: playlist.tracks.total
                };
            });
        }
    } catch(error) {
        console.log(error);
    }
    };

    export const getPlaylistTracks = async (playlistId) => {
        const accessToken = getAccessToken();
        const headerObj = {
            headers: {Authorization: `Bearer ${accessToken}`}
        };
        const queryString = `/playlists/${playlistId}/tracks`;
        const url = `${urlToFetch}${queryString}`;
        try {
            const response = await fetch(url, headerObj);
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.items.map(item => {
                    return {
                        id: item.track.id,
                        name: item.track.name,
                        artist: item.track.artists[0].name,
                        album: item.track.album.name,
                        uri: item.track.uri
                    };
                }); 
            }
        } catch(error) {
            console.log(error);
        }
    };

    export const updatePlaylist = async (playlistId, uriArray) => {
        const accessToken = getAccessToken();
        const headerObj = {
            headers: {Authorization: `Bearer ${accessToken}`}
        };
        const queryString = `/playlists/${playlistId}/tracks`;
        const url = `${urlToFetch}${queryString}`;
        const obj = {
            method: 'PUT',
            headers: headerObj.headers,
            body: JSON.stringify({
                    uris: uriArray
                })
        };
        try {
            await fetch(url, obj);
        } catch(error) {
            console.log(error);
        }
    };