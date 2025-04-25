import React, { useState } from "react";
import {useDadJokes} from "../../hooks/useDadJokes";

export default function AdminPage() {
  const { jokes, loading, error, addJoke, deleteJoke } = useDadJokes();
  const [newJoke, setNewJoke] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();        
    addJoke({joke: newJoke});
    setNewJoke("");
  }

  return (
    <div>
      <h1>Admin Page</h1>

      <h2>All Jokes</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}

      <ul>
        {jokes.map(joke => (
          <li key={joke._id}>
            {joke.joke}
            <button onClick={() => deleteJoke(joke._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add Joke</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="joke"
          required
          vaue={newJoke}
          onChange={(e) => setNewJoke(e.target.value)}
        />
        <button type="submit">Add Jokes</button>
      </form>
      </div>
  );
}