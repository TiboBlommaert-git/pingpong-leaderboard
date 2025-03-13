import React, { useState } from "react";
import axios from "axios";

const MatchForm = ({ updateLeaderboard }) => {
    const [winner, setWinner] = useState("");
    const [loser, setLoser] = useState("");
    const [errors, setErrors] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const response = await axios.post("http://localhost:8000/api/matchResult", {
                winner,
                loser,
            });
            updateLeaderboard();
            setWinner("");
            setLoser("");
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors || {}); 
            } else {
                console.error("Error submitting match result:", error);
            }
        }
    };

    return (
        <div className="c-form">
            <h2>Record a Match Result</h2>
            <form onSubmit={handleSubmit} className="d-flex">
                <div className="d-flex ">
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
                        {errors.winner && <p className="c-form_error">{errors.winner[0]}</p>}
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
                        {errors.loser && <p className="c-form_error">{errors.loser[0]}</p>}
                    </div>
                </div>
                <div className="">
                    <button type="submit" className="c-button c-button_match">
                        Submit Match
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MatchForm;
