import React, { useState, useEffect } from "react";

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState(50);
  const [stones, setStones] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStopped, setGameStopped] = useState(false);
  const playerWidth = 10;
  const playerHeight = 10;
  const stoneWidth = 10;

  let gameLoop;

  // Function to move the player
  const movePlayer = (direction) => {
    if (direction === "left") {
      setPlayerPosition((prevPosition) => Math.max(prevPosition - 1, 0));
    } else if (direction === "right") {
      setPlayerPosition((prevPosition) =>
        Math.min(prevPosition + 1, 100 - playerWidth)
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && playerPosition > 0) {
        movePlayer("left");
      } else if (e.key === "ArrowRight" && playerPosition < 100 - playerWidth) {
        movePlayer("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerPosition]);

  // Function to add a new stone
  const addStone = () => {
    const newStone = {
      id: Date.now(),
      x: Math.random() * (100 - stoneWidth), // Random horizontal position within the game width
      y: 0,
      speed: 1,
    };
    setStones((prevStones) => [...prevStones, newStone]);
  };

  // Function to check collisions
  // const checkCollisions = () => {
  //   for (const stone of stones) {
  //     const playerLeft = playerPosition;
  //     const playerRight = playerPosition + playerWidth;
  //     const playerTop = 100 - playerHeight;
  //     const playerBottom = 100;

  //     const stoneLeft = stone.x;
  //     const stoneRight = stone.x + stoneWidth;
  //     const stoneTop = stone.y;
  //     const stoneBottom = stone.y + stoneWidth;

  //     if (
  //       playerRight > stoneLeft &&
  //       playerLeft < stoneRight &&
  //       playerBottom > stoneTop &&
  //       playerTop < stoneBottom
  //     ) {
  //       console.log("Collision detected");
  //       stopGame();
  //       return;
  //     }
  //   }
  // };

  const checkCollisions = () => {
    let collisionDetected = false;
    for (const stone of stones) {
      const stoneXStart = stone.x;
      const stoneXEnd = stone.x + stoneWidth;
      const playerXStart = playerPosition;
      const playerXEnd = playerPosition + playerWidth;
      const stoneYStart = stone.y;
      const stoneYEnd = stone.y + stoneWidth;
      const playerYStart = 0;
      const playerYEnd = playerHeight;

      if (
        stoneXEnd >= playerXStart &&
        stoneXStart <= playerXEnd &&
        stoneYEnd >= playerYStart &&
        stoneYStart <= playerYEnd
      ) {
        collisionDetected = true;
      }
    }

    if (collisionDetected) {
      stopGame();
    }
  };

  // Function to remove stones that are out of the screen
  const removeStones = () => {
    setStones((prevStones) => prevStones.filter((stone) => stone.y <= 100));
  };

  // Game loop
  useEffect(() => {
    if (gameStarted && !isGameOver) {
      gameLoop = setInterval(() => {
        addStone();
        removeStones();
        checkCollisions();
        setStones((prevStones) =>
          prevStones.map((stone) => ({
            ...stone,
            y: stone.y + stone.speed,
          }))
        );
      }, 100);
    }

    return () => {
      if (gameLoop) {
        clearInterval(gameLoop);
      }
    };
  }, [gameStarted, isGameOver]);

  const stopGame = () => {
    console.log("Stopping the game");
    setIsGameOver(true);
    setGameStopped(true);
    clearInterval(gameLoop);
  };
  const startGame = () => {
    setGameStarted(true);
  };

  // Function to restart the game
  const restartGame = () => {
    setPlayerPosition(50);
    setStones([]);
    setIsGameOver(false);
    setGameStopped(false);
    setGameStarted(false);
  };

  return (
    <div
      className="Game"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {!gameStarted && (
        <div>
          {" "}
          <p className="fs-4 text-center">Welcome to the Game!</p>
          <p className="fs-4 text-center">
            Use the left and right arrow keys to move.
          </p>
          <button className="btn btn-success text-center" onClick={startGame}>
            Start
          </button>
        </div>
      )}
      {gameStarted && (
        <div>
          <div
            style={{
              position: "relative",
              width: "300px",
              height: "400px",
              border: "1px solid #000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: playerPosition + "%",
                bottom: "0",
                width: playerWidth + "px",
                height: playerHeight + "px",
                background: "green",
              }}
            ></div>
            {stones.map((stone) => (
              <div
                key={stone.id}
                style={{
                  position: "absolute",
                  left: stone.x + "%",
                  top: stone.y + "%",
                  width: stoneWidth + "px",
                  height: stoneWidth + "px",
                  background: "blue",
                }}
              ></div>
            ))}
          </div>
          {isGameOver && (
            <div
              style={{
                position: "absolute",
                left: "50%", // Center horizontally
                top: "50%", // Center vertically
                transform: "translate(-50%, -50%)", // Center horizontally and vertically
                width: "100%",
                textAlign: "center",
              }}
            >
              <p className="text-danger fs-1   fw-bold">Game Over</p>
              <button className="btn btn-warning mt-2" onClick={restartGame}>
                Back
              </button>
            </div>
          )}
          {!gameStopped && !isGameOver && (
            <button className="btn btn-secondary mt-2" onClick={stopGame}>
              Stop
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
