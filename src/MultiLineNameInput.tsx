import React from "react";

interface Props {
  value: string;
  setValue: (text: string) => void;
}

const MultiLineNameInput: React.FC<Props> = ({ value, setValue }) => {
  return (
    <div className="name-input-area">
      <textarea
        rows={10}
        placeholder="Enter names, one per line"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="textarea"
      />
    </div>
  );
};

export default MultiLineNameInput;
