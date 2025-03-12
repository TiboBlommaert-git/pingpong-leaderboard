import React from "react";

const LeaderboardTable = ({
    leaderboard,
    handleDeletePlayer,
    handleResetPoints,
}) => {
    return (
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
                            <th className="c-tabel_item-rank">Positie</th>
                            <th>Naam</th>
                            <th>Punten</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((player, index) => (
                            <tr key={index} className="c-tabel_item">
                                <td className="c-tabel_item-rank">
                                    {player.rank}
                                </td>
                                <td>{player.name}</td>
                                <td>{player.points} ptn</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleDeletePlayer(player.id)
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
    );
};

export default LeaderboardTable;
