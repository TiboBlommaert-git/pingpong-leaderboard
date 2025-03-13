import React, { useState } from "react";
import axios from "axios";

const MatchForm = ({ updateLeaderboard, setMessage }) => {
    const [winner, setWinner] = useState("");
    const [loser, setLoser] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/matchResult", {
                winner,
                loser,
            });
            updateLeaderboard();
            setWinner("");
            setLoser("");
        } catch (error) {
            console.error("Error", error);
            setMessage("There was an error saving the match.");
        }
    };

    return (
        <div className="c-form">
            <h2>Record a Match Result</h2>
            <form onSubmit={handleSubmit} className="d-flex">
                <div className="d-flex align-items-end">
                    <div className="c-form_item">
                        <label>Winner</label>
                        <input
                            type="text"
                            value={winner}
                            onChange={(e) => setWinner(e.target.value)}
                            placeholder="Enter winner's name"
                            required
                            className="c-form_input"
                        />
                    </div>
                    <div className="c-result_tag">
                        <p>VS</p>
                    </div>
                    <div className="c-form_item">
                        <label className="c-form_label-lose">Loser</label>
                        <input
                            type="text"
                            value={loser}
                            onChange={(e) => setLoser(e.target.value)}
                            placeholder="Enter loser's name"
                            required
                            className="c-form_input c-form_input-loser"
                        />
                    </div>
                </div>
                <div className="d-flex align-items-end">
                    <button type="submit" className="c-button c-button_match">
                        Submit Match
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MatchForm;
