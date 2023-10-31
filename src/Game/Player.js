import React, { useState, useEffect } from "react";

const Car = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setPosition({ ...position, x: position.x - 10 });
    } else if (e.key === "ArrowRight") {
      setPosition({ ...position, x: position.x + 10 });
    } else if (e.key === "ArrowUp") {
      setPosition({ ...position, y: position.y - 10 });
    } else if (e.key === "ArrowDown") {
      setPosition({ ...position, y: position.y + 10 });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [position]);

  return (
    <div
      className="car"
      style={{ left: position.x + "px", top: position.y + "px" }}
    >
      🚗
    </div>
  );
};

export default Car;
