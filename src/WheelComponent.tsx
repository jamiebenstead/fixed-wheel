import React from "react";
import { Wheel } from "react-custom-roulette";
import { colours } from "./colours";

interface Props {
  names: string[];
  setWinner: (name: string) => void;
  mustSpin: boolean;
  setMustSpin: (spin: boolean) => void;
  winnerNumber: number;
  onSpinClick: () => void;
}

const WheelComponent: React.FC<Props> = ({
  names,
  setWinner,
  mustSpin,
  setMustSpin,
  winnerNumber,
  onSpinClick,
}) => {
  const wheelData = names.map((name, index) => ({
    option: name,
    style: {
      backgroundColor: colours[index % colours.length],
    },
  }));

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        onClick={onSpinClick}
        style={{ cursor: "pointer", display: "inline-block" }}
      >
        {names.length > 0 ? (
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={winnerNumber}
            data={wheelData}
            onStopSpinning={() => {
              setMustSpin(false);
              setWinner(names[winnerNumber]);
            }}
            spinDuration={0.5}
          />
        ) : null}
      </div>
    </div>
  );
};

export default WheelComponent;
