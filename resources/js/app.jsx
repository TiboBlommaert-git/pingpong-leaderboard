import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/custom.scss";

function App() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [winner, setWinner] = useState("");
    const [loser, setLoser] = useState("");
    const [message, setMessage] = useState("");
    const [pointsAwarded, setPointsAwarded] = useState(null);
    const [newPlayer, setNewPlayer] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/leaderboard")
            .then((response) => {
                setLeaderboard(response.data);
            })
            .catch((error) => {
                console.error("Error", error);
            });
    }, []);
    const updateLeaderboard = () => {
        axios
            .get("http://localhost:8000/api/leaderboard")
            .then((response) => {
                setLeaderboard(response.data);
            })
            .catch((error) => {
                console.error("Error", error);
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
            const response = await axios.post(
                "http://localhost:8000/api/addPlayer",
                { name: newPlayer }
            );
            setMessage(response.data.message);
            setNewPlayer("");
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
        if (!window.confirm("Are you sure you want to delete this player?"))
            return;
        try {
            await axios.delete(`http://localhost:8000/api/deletePlayer/${id}`);
            updateLeaderboard((prev) =>
                prev.filter((player) => player.id !== id)
            );
        } catch (error) {
            console.error("Error", error);
        }
    };
    const handleResetPoints = async () => {
        if (
            !window.confirm(
                "Are you sure you want to reset all players' points?"
            )
        )
            return;
        try {
            await axios.post("http://localhost:8000/api/resetPoints");
            updateLeaderboard((prev) =>
                prev.map((player) => ({ ...player, points: 0 }))
            );
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-center c-title">
                        <h1>🏓 Ping Pong Leaderboard 🏓</h1>
                    </div>
                    <div className="c-form">
                        <h2>Record a Match Result</h2>
                        <form onSubmit={handleSubmit} className="d-flex">
                            <div className="d-flex align-items-end">
                                <div className="c-form_item">
                                    <label>Winner</label>

                                    <input
                                        type="text"
                                        value={winner}
                                        onChange={(e) =>
                                            setWinner(e.target.value)
                                        }
                                        placeholder="Enter winner's name"
                                        required
                                        className="c-form_input"
                                    />
                                </div>
                                <div className="c-result_tag">
                                    <p>VS</p>
                                </div>
                                <div className="c-form_item">
                                    <label className="c-form_label-lose">
                                        Loser
                                    </label>
                                    <input
                                        type="text"
                                        value={loser}
                                        onChange={(e) =>
                                            setLoser(e.target.value)
                                        }
                                        placeholder="Enter loser's name"
                                        required
                                        className="c-form_input c-form_input-loser"
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-end">
                                <button
                                    type="submit"
                                    className="c-button c-button_match"
                                >
                                    Submit Match
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="c-form">
                        <h2>Add a new Player</h2>
                        <form onSubmit={handleAddPlayer} className="d-flex">
                            <div className="d-flex align-items-end">
                                <div className="c-form_item">
                                    <label>New player name</label>
                                    <input
                                        type="text"
                                        value={newPlayer}
                                        onChange={(e) =>
                                            setNewPlayer(e.target.value)
                                        }
                                        placeholder="Enter player name"
                                        required
                                        className="c-form_input"
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-end">
                                <button type="submit" className="c-button">
                                    Add Player
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div>
                            <div className="d-flex justify-content-between">
                                <h2>Leaderboard</h2>
                                <button
                                    onClick={handleResetPoints}
                                    className="c-button c-button_reset"
                                >
                                    Reset Points
                                </button>
                            </div>
                            <table border="1" className="c-tabel">
                                <thead>
                                    <tr className="c-tabel_item">
                                        <th className="c-tabel_item-rank">
                                            Positie
                                        </th>
                                        <th>Naam</th>
                                        <th>Punten</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard.map((player, index) => (
                                        <tr
                                            key={index}
                                            className="c-tabel_item"
                                        >
                                            <td className="c-tabel_item-rank">
                                                {player.rank}
                                            </td>
                                            <td>{player.name}</td>
                                            <td>{player.points} ptn</td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        handleDeletePlayer(
                                                            player.id
                                                        )
                                                    }
                                                    className="c-tabel_button"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="#ffff"
                                                        class="bi bi-trash-fill"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
