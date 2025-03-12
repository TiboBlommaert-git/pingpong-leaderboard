import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

function App() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [winner, setWinner] = useState("");
    const [loser, setLoser] = useState("");
    const [message, setMessage] = useState("");
    const [pointsAwarded, setPointsAwarded] = useState(null);
    const [newPlayer, setNewPlayer] = useState('');


    useEffect(() => {
        axios
            .get("http://localhost:8000/api/leaderboard")
            .then((response) => {
                setLeaderboard(response.data);
            })
            .catch((error) => {
                console.error(
                    "Er is een fout opgetreden bij het ophalen van de leaderboard:",
                    error
                );
            });
    }, []);
    const updateLeaderboard = () => {
        axios
            .get("http://localhost:8000/api/leaderboard")
            .then((response) => {
                setLeaderboard(response.data);
            })
            .catch((error) => {
                console.error(
                    "Er is een fout opgetreden bij het ophalen van de leaderboard:",
                    error
                );
            });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8000/api/matchResult",
                {
                    winner,
                    loser,
                }
            );

            setMessage(response.data.message);
            setPointsAwarded(response.data.points_awarded);
            updateLeaderboard();
        } catch (error) {
            console.error("Error saving match:", error);
            setMessage("There was an error saving the match.");
        }
    };
    const handleAddPlayer = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/addPlayer', { name: newPlayer });
            setMessage(response.data.message);
            setNewPlayer(''); 
            updateLeaderboard();
        } catch (error) {
            setMessage("Error adding player. The name might already exist.");
        }
    };

    return (
        <div>
            <h1>🏓 Ping Pong Leaderboard</h1>
            <div>
                <h2>Add a new Player</h2>
                <form onSubmit={handleAddPlayer}>
                    <input type="text" value={newPlayer} onChange={(e) => setNewPlayer(e.target.value)} 
                        placeholder="Enter player name" 
                        required />
                    <button type="submit">Add Player</button>
                </form>
            </div>
            <div>
                <h2>Record a Match Result</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Winner:
                            <input 
                                type="text" 
                                value={winner} 
                                onChange={(e) => setWinner(e.target.value)} 
                                placeholder="Enter winner's name"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Loser:
                            <input 
                                type="text" 
                                value={loser} 
                                onChange={(e) => setLoser(e.target.value)} 
                                placeholder="Enter loser's name"
                                required
                            />
                        </label>
                    </div>
                    <button type="submit">Submit Match</button>
                </form>

                {message && <div>{message}</div>}
                {pointsAwarded !== null && (
                    <div>Points Awarded: {pointsAwarded}</div>
                )}
            </div>
            <div>
                <h2>Leaderboard</h2>
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
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
