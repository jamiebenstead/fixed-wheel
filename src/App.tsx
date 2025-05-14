import React, { useCallback, useEffect, useState } from "react";
import WheelComponent from "./WheelComponent";
import MultiLineNameInput from "./MultiLineNameInput";
import WinnerPopup from "./WinnerPopup";
import "./styles.css";

const App: React.FC = () => {
  const [rawInput, setRawInput] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [mustSpin, setMustSpin] = useState(false);
  const [winnerNumber, setWinnerNumber] = useState(0);
  const [selectedWinnerName, setSelectedWinnerName] = useState<string | null>(
    null
  );

  useEffect(() => {
    const newNames = rawInput
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name !== "");
    setNames(newNames);
  }, [rawInput]);

  const handleSpinClick = useCallback(() => {
    if (names.length === 0) return;

    let chosenIndex: number;

    if (selectedWinnerName && names.includes(selectedWinnerName)) {
      chosenIndex = names.indexOf(selectedWinnerName);
    } else {
      chosenIndex = Math.floor(Math.random() * names.length);
    }

    setWinnerNumber(chosenIndex);
    setMustSpin(true);
  }, [names, selectedWinnerName]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");

      if (e.shiftKey && (isMac ? e.altKey : e.altKey)) {
        const digitMatch = e.code.match(/^Digit([1-9])$/);
        if (digitMatch) {
          const index = parseInt(digitMatch[1], 10) - 1;
          if (index < names.length) {
            setSelectedWinnerName(names[index]);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [names]);

  return (
    <div className="app-container">
      <div className="main-layout">
        <div className="wheel-container">
          <WheelComponent
            names={names}
            setWinner={setWinner}
            mustSpin={mustSpin}
            setMustSpin={setMustSpin}
            winnerNumber={winnerNumber}
            onSpinClick={handleSpinClick}
          />
        </div>
        <div className="input-and-button">
          <MultiLineNameInput value={rawInput} setValue={setRawInput} />
          <button
            className="spin-button"
            onClick={handleSpinClick}
            disabled={names.length === 0}
          >
            Spin the Wheel!
          </button>
        </div>
      </div>

      {winner && (
        <WinnerPopup winner={winner} onClose={() => setWinner(null)} />
      )}
    </div>
  );
};

export default App;
