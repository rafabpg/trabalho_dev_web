import React from "react";

interface ChipProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, selected, onSelect }) => {
  return (
    <button
      type="button"
      className={`px-3 py-1 border rounded-full m-1 ${
        selected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
      }`}
      onClick={onSelect}
    >
      {label}
    </button>
  );
};

export default Chip;
