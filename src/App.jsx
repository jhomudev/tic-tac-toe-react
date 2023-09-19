import { useState } from "react";
import confetti from "canvas-confetti";
import Square from "./components/Square";
import { TURNS } from "./constants";
import "./App.css";
import { checkEndGame, checkWinner } from "./logic/boardFunc";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalstorage = window.localStorage.getItem("board");
    return boardFromLocalstorage
      ? JSON.parse(boardFromLocalstorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromLocalstorage = window.localStorage.getItem("turn");
    return turnFromLocalstorage ?? TURNS.X;
  });
  const [winner, setWinner] =
    useState(null); /* null=no hay ganador, false=empate */

  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    // eliminar datos de localstorage
    window.localStorage.removeItem("turn");
    window.localStorage.removeItem("board");
  }

  function updateBoard(index) {
    // no se actualiza si el square ya esta marcado
    if (board[index] || winner) return;
    // actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // guardar en localstorage datos
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);

    // actualizar winner o ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Resetear el juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : "Ganó: "}</h2>
            <span className="win">{winner && <Square>{winner}</Square>}</span>
            <button onClick={resetGame}>Empezar de nuevo</button>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
