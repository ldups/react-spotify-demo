import axios from 'axios';
import {useEffect, useState} from 'react';
import './App.css';
import RenderedArtists from './RenderedArtists';
import RenderedTracks from './RenderedTracks';



function App() {
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token"
  const scopes = [
    "user-top-read"
  ]

  const [token, setToken] = useState("")
  const [artists, setArtists] = useState([])
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

}, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const searchTopArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
  
    setArtists(data.items)
  }

  const searchTopTracks = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    setTracks(data.items);
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>React with Spotify API Demo</h1>
      <div className='buttons'>
      {!token ?
                    <div className='button'><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join("%20")}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a></div>
                    : <button onClick={logout} className='button'>Logout</button>}

    <button onClick={searchTopArtists} className='button'>
        Get top artists.
    </button>
    <button onClick={searchTopTracks} className='button'>
        Get top tracks.
    </button>
      </div>
    <div className='rendered-containers'>
      <RenderedArtists artists={artists}/>
      <RenderedTracks tracks={tracks}/>
    </div>
      </header>
    </div>
  );

}

export default App;
