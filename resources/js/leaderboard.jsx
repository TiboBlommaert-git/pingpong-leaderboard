import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/custom.scss";
import LeaderboardTable from "./components/LeaderboardTable";

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    useEffect(() => {
        updateLeaderboard();
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
    return (
        <div className="container">
            <div className="d-flex justify-content-center c-title">
                <div className="c-header">
                <h1>🏓 Ping Pong Leaderboard 🏓</h1>
                <a href="/" className="c-header_link">Home</a>
                </div>
            </div>
            <LeaderboardTable 
                leaderboard={leaderboard} 
                updateLeaderboard={updateLeaderboard}
            />
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("leaderboard")).render(<Leaderboard />);

export default Leaderboard; 