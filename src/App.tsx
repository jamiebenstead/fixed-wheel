import React, { useEffect, useState } from "react";
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
  const [adminMode, setAdminMode] = useState(false);
  const [selectedWinnerName, setSelectedWinnerName] = useState<string | null>(
    null
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && e.key.toLowerCase() === "a") {
        setAdminMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const newNames = rawInput
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name !== "");
    setNames(newNames);
  }, [rawInput]);

  const handleSpinClick = () => {
    if (names.length === 0) return;

    let chosenIndex: number;

    if (selectedWinnerName && names.includes(selectedWinnerName)) {
      chosenIndex = names.indexOf(selectedWinnerName);
    } else {
      chosenIndex = Math.floor(Math.random() * names.length);
    }

    setWinnerNumber(chosenIndex);
    setMustSpin(true);
  };

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
          {adminMode && (
            <div className="admin-panel">
              <p style={{ fontWeight: "bold" }}>Admin Mode: Select a winner</p>
              <ul>
                {names.map((name) => (
                  <li
                    key={name}
                    style={{
                      cursor: "pointer",
                      fontWeight:
                        selectedWinnerName === name ? "bold" : "normal",
                      backgroundColor:
                        selectedWinnerName === name ? "#d0ffd0" : "transparent",
                      padding: "4px",
                    }}
                    onClick={() =>
                      setSelectedWinnerName((prev) =>
                        prev === name ? null : name
                      )
                    }
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {winner && (
        <WinnerPopup winner={winner} onClose={() => setWinner(null)} />
      )}
    </div>
  );
};

export default App;
