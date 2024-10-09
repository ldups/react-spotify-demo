import axios from 'axios';
import {useEffect, useState} from 'react';
import './App.css';
import RenderedItems from './RenderedItems';



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

  const searchTopItems = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
  
    setArtists(data.items)
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>Spotify React</h1>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join("%20")}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}

    <button onClick={searchTopItems}>
        Get top artists.
    </button>

    <RenderedItems items={artists}/>
      </header>
    </div>
  );

}

export default App;
