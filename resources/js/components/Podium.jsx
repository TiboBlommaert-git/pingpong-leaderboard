import React from "react";

const Podium = ({ players }) => {
    if (players.length < 3) return null;
    const getImageUrl = (player) => {
        return player?.image
            ? `http://localhost:8000/storage/${player.image}`
            : "storage/players/default-avatar.jpg";
    };
    return (
        <div className="c-podium">
            <h2 className="c-podium_title">Podium</h2>
            <div className=" d-flex justify-content-evenly">
                <div className="podium-2 c-podium_place c-podium_place-2">
                    <img
                        src={getImageUrl(players[1])}
                        alt={players[1].name}
                        className="c-podium_img"
                    />
                    <p className="c-podium_name">#2</p>
                    <p className="c-podium_name">{players[1].name}</p>
                </div>
                <div className="podium-1 c-podium_place c-podium_place-1">
                    <img
                        src={getImageUrl(players[0])}
                        alt={players[0].name}
                        className="c-podium_img"
                    />
                    <p className="c-podium_name">#1</p>
                    <p className="c-podium_name"> {players[0].name}</p>
                </div>
                <div className="podium-3 c-podium_place c-podium_place-3">
                    <img
                        src={getImageUrl(players[2])}
                        alt={players[2].name}
                        className="c-podium_img"
                    />
                    <p className="c-podium_name">#3</p>
                    <p className="c-podium_name">{players[2].name}</p>
                </div>
            </div>
        </div>
    );
};

export default Podium;
