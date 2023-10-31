import React, { useEffect, useState } from "react";

const AutomaticCar = ({ speed, lane }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const moveCar = () => {
      setPosition((prevPosition) => (prevPosition + speed) % 400);
    };

    const carMoveInterval = setInterval(moveCar, 100);

    return () => {
      clearInterval(carMoveInterval);
    };
  }, [speed]);

  return (
    <div
      className="automatic-car"
      style={{ left: `${lane * 100}px`, top: `${position}px` }}
    >
      🚗
    </div>
  );
};

export default AutomaticCar;
