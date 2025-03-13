import React, { useState, useRef } from "react";
import axios from "axios";

const PlayerForm = ({ updateLeaderboard }) => {
    const [newPlayer, setNewPlayer] = useState("");
    const [playerImage, setPlayerImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleAddPlayer = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", newPlayer);

            if (playerImage) {
                formData.append("image", playerImage);
            }

            const response = await axios.post("http://localhost:8000/api/addPlayer", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setNewPlayer("");
            setPlayerImage(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            updateLeaderboard();
        } catch (error) {
            console.error("Error adding player:", error);
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
                    <div className="c-form_item">
                        <label>Player Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={(e) => setPlayerImage(e.target.files[0])}
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
