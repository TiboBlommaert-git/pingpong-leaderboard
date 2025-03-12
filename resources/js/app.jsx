import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

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
                    "Error",
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
                    "Error",
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
            console.error("Error", error);
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
            setMessage("Error");
        }
    };

    const handleDeletePlayer = async (id) => {
        if (!id) {
            console.error("Error: No ID");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this player?")) return;
        try {
            await axios.delete(`http://localhost:8000/api/deletePlayer/${id}`);
            setLeaderboard(prev => prev.filter(player => player.id !== id));
        } catch (error) {
            console.error("Error", error);
        }
    };
    const handleResetPoints = async () => {
        if (!window.confirm("Are you sure you want to reset all players' points?")) return;
        try {
            await axios.post('http://localhost:8000/api/resetPoints');
            updateLeaderboard(prev => prev.map(player => ({ ...player, points: 0 }))); 
        } catch (error) {
            console.error("Error", error);
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
            </div>
            <div>
                <h2>Leaderboard</h2>
                <button onClick={handleResetPoints}>
                    Reset Points
                </button>
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
                                <td>
                                    <button onClick={() => handleDeletePlayer(player.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
