import React, { useState, useEffect } from 'react';

function App() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(response => response.json())
      .then(data => setLeaderboard(data));
  }, []);

  return (
    <div>
      <h1>Ping Pong Leaderboard</h1>
      <ul>
        {leaderboard.map((player, index) => (
          <li key={player.id}>
            {index + 1}. {player.name} - {player.points} pt
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
