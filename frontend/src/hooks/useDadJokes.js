import axios from "axios";
import { useEffect, useState } from "react";

export function useDadJokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchJokes() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/dad-jokes');
      setJokes(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  async function addJoke(joke) {
    const oldJokes = jokes;
    setJokes([...oldJokes, joke]);
    try {        
        const response = await axios.post('http://localhost:5000/api/dad-jokes', joke);
        setJokes([...oldJokes, response.data]);
    } catch (error) {
        console.log(error);
        setJokes(oldJokes);
        setError(error);
    }
  }

  async function deleteJoke(_id) {
    const oldJokes = jokes;
    try {
        await axios.delete(`http://localhost:5000/api/dad-jokes/${_id}`);
        setJokes(oldJokes.filter(joke => joke._id !== _id));
    } catch (error) {
      setJokes(oldJokes);
      setError(error);
    }
  }

  useEffect(() => {
    fetchJokes();
  }, []);

  return { jokes, loading, error, addJoke, deleteJoke };
}