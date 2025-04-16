import React from "react";
import { motion } from "framer-motion";

interface Props {
  winner: string;
  onClose: () => void;
}

const WinnerPopup: React.FC<Props> = ({ winner, onClose }) => {
  return (
    <motion.div
      className="winner-popup"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <p>🎉 {winner} is the winner! 🎉</p>
      <button onClick={onClose}>Close</button>
    </motion.div>
  );
};

export default WinnerPopup;
