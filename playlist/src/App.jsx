import { useState } from "react";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([
    { id: 1, title: "Blinding Lights", artist: "The Weeknd" },
    { id: 2, title: "HUMBLE.", artist: "Kendrick Lamar" },
    { id: 3, title: "Levitating", artist: "Dua Lipa" },
  ]);
const [title, setTitle] = useState("");
const [artist, setArtist] = useState("");

function handleSubmit(e) {
  e.preventDefault();
  const newSong = { id: Date.now(), title: title, artist: artist };
  setSongs([...songs, newSong]);
  setTitle("");
  setArtist("");
}
function removeSong(id) {
  setSongs(songs.filter((song) => song.id !== id));
}

function toggleFav(id) {
  setSongs(
    songs.map((song) =>
      song.id === id ? { ...song, fav: !song.fav } : song
    )
  );
}
const favCount = songs.filter((song) => song.fav).length;
  return (
    <div>
      <h1>My Playlist</h1>
      <form onSubmit={handleSubmit}>
  <input
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
  <input
    placeholder="Artist"
    value={artist}
    onChange={(e) => setArtist(e.target.value)}
  />
  <button type="submit">Add</button>
</form>
<p>Favorites: {favCount}</p>

{songs.length === 0 ? (
  <p>Your playlist is empty. Add a song!</p>
) : (
  <ul>
    {songs.map((song) => (
      <li key={song.id}>
        <button onClick={() => toggleFav(song.id)}>
          {song.fav ? "★" : "☆"}
        </button>
        {song.title} by {song.artist}
        <button onClick={() => removeSong(song.id)}>Remove</button>
      </li>
    ))}
  </ul>
)}
    </div>
  );
}

export default App;