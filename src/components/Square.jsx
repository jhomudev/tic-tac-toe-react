import React from "react";

function Square({ children, isSelected, updateBoard, index }) {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  function handleClik() {
    updateBoard(index);
  }
  return (
    <div onClick={handleClik} className={className}>
      {children}
    </div>
  );
}

export default Square;
