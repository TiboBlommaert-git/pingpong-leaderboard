import React, { useState } from "react";
import axios from "axios";

const PlayerForm = ({ updateLeaderboard, setMessage }) => {
    const [newPlayer, setNewPlayer] = useState("");

    const handleAddPlayer = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/addPlayer", { name: newPlayer });
            setMessage(response.data.message);
            setNewPlayer("");
            updateLeaderboard();
        } catch (error) {
            setMessage("Error");
        }
    };

    return (
        <div className="c-form">
            <h2>Add a new Player</h2>
            <form onSubmit={handleAddPlayer} className="d-flex">
                <div className="d-flex align-items-end">
                    <div className="c-form_item">
                        <label>New player name</label>
                        <input
                            type="text"
                            value={newPlayer}
                            onChange={(e) => setNewPlayer(e.target.value)}
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
    );
};

export default PlayerForm;
