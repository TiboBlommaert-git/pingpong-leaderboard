import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

function App() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/leaderboard')
        .then(response => {
                setLeaderboard(response.data);
            })
            .catch(error => {
                console.error("Er is een fout opgetreden bij het ophalen van de leaderboard:", error);
            });
    }, []);

    return (
        <div>
            <h1>🏓 Ping Pong Leaderboard</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Positie</th>
                        <th>Naam</th>
                        <th>Punten</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((player, index) => (
                        <tr key={index}>
                            <td>{player.rank}</td>
                            <td>{player.name}</td>
                            <td>{player.points} ptn</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
