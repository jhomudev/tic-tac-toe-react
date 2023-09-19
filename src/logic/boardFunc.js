import { WINNER_COMBOS } from "./../constants";

export function checkWinner(boardToCheck) {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    )
      return boardToCheck[a];
  }
  // no hay ganador
  return null;
}

export function checkEndGame(boardToCheck) {
  return boardToCheck.every((square) => square !== null);
}
