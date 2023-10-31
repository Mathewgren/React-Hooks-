import React, { useState, useEffect } from "react";
import Road from "./Road";
import Car from "../Player";
import AutomaticCar from "./AutomaticCar";

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [raceStarted, setRaceStarted] = useState(false);
  const [automaticCars, setAutomaticCars] = useState([
    { id: 1, speed: 10, lane: 1 },
    { id: 2, speed: 3, lane: 2 },
    { id: 3, speed: 4, lane: 3 },
  ]);

  useEffect(() => {
    // Start the race after a 3-second countdown
    const countdownInterval = setInterval(() => {
      setRaceStarted(true);
      clearInterval(countdownInterval);
    }, 3000);

    // Move all cars, including the player, vertically from bottom to top
    const moveCars = () => {
      if (raceStarted) {
        setPlayerPosition((prevPosition) => prevPosition - 1);
        setAutomaticCars((prevCars) =>
          prevCars.map((car) => ({
            ...car,
            lane: car.lane, // Keep the same lane
          }))
        );
      }
    };

    const gameInterval = setInterval(moveCars, 100);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(gameInterval);
    };
  }, [raceStarted]);

  const handleKeyUp = (e) => {
    if (e.key === "ArrowUp") {
      // Move the player's car forward when the up arrow key is pressed
      setPlayerPosition((prevPosition) => prevPosition - 10);
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div>
      {" "}
      <h1>Car Racing Game</h1>
      <div className="game-container">
        <Road />
        <Car position={playerPosition} />
        {automaticCars.map((car) => (
          <AutomaticCar key={car.id} speed={car.speed} lane={car.lane} />
        ))}
      </div>
    </div>
  );
};

export default Game;
