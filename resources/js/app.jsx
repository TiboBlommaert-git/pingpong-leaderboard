import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/custom.scss";
import LeaderboardTable from "./components/LeaderboardTable";
import MatchForm from "./components/MatchForm";
import PlayerForm from "./components/PlayerForm";
import Podium from "./components/Podium"; 

function App() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [message, setMessage] = useState("");
    const topPlayers = [...leaderboard].sort((a, b) => b.points - a.points).slice(0, 3);
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
                <h1>🏓 Ping Pong Leaderboard 🏓</h1>
            </div>
            <MatchForm updateLeaderboard={updateLeaderboard} setMessage={setMessage} />
            <PlayerForm updateLeaderboard={updateLeaderboard} setMessage={setMessage} />
            {topPlayers.length === 3 && <Podium players={topPlayers} />}
            <LeaderboardTable 
                leaderboard={leaderboard} 
                updateLeaderboard={updateLeaderboard}
            />
            {message && <p>{message}</p>}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
