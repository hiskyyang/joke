import axios from 'axios';
import {useEffect, useState} from 'react';

export default function HomePage() {

    const [joke, setJoke] = useState('');

    async function fetchDadJoke() {
        const response = await axios.get('http://localhost:5000/api/dad-jokes/random')
        setJoke(response.data.joke);
    } 

    useEffect(() => {
        fetchDadJoke();
    }, []);

    return (
        <div>
        <h1>Daily Dad Joke</h1>
        <main>
            <p> {joke}</p>
            <button onClick={fetchDadJoke}>Teel me another!</button>
        </main>
        </div>
    );
}