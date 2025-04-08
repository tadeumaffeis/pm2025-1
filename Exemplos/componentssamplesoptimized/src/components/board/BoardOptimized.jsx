/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CellOptimized from "../cell/CellOptimized.jsx";
import "./board.css";

export function BoardOptimized() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(0);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [countGame, setCountGame] = useState(0);
  const [history, setHistory] = useState(Array());
  const [historyIndex, setHistoryIndex] = useState(0);

  const roundFactory = () => {
    return {
      board,
      player,
      winner,
      score,
      countGame,
    };
  };

  const addHistory = () => {
    let prevHistory = [...history];
    prevHistory.push(roundFactory());
    setHistoryIndex(prevHistory.length - 1);
    setHistory(prevHistory);
    console.log(history);
  };

  const prevHistory = () => {
    if (historyIndex === 0) return;
    setHistoryIndex((prevIndex) => prevIndex - 1);
    const prevRound = history[historyIndex - 1];
    setPlayer(prevRound.player);
    setWinner(prevRound.winner);
    setScore(prevRound.score);
    setCountGame(prevRound.countGame);
    setBoard(prevRound.board);
    board.forEach((cell) => {
      if (cell?.reset) cell.reset();
    });
    board.map((cell, index) => {
      if (cell?.setCell) cell.setCell(prevRound.board[index]);
    });
    console.log('prev borad:', prevRound.board);
  };

  const nextHistory = () => {
    if (historyIndex === board.length) return;
    setHistoryIndex((newIndex) => newIndex + 1 > history.length? history.length: newIndex + 1);
    const newRound = history[historyIndex - 1];
    setPlayer(newRound.player);
    setWinner(newRound.winner);
    setScore(newRound.score);
    setCountGame(newRound.countGame);
    setBoard(newRound.board);
    board.forEach((cell) => {
      if (cell?.setCell) cell.setCell(cell);
    });
    board.map((cell, index) => {
      if (cell?.setCell) cell.setCell(newRound.board[index]);
    });
    console.log('prev borad:', newRound.board);
  };

  const resetBoard = () => {
    if (checkWinner() !== null && countGame < 3) return;
    
    let full = true;
    for (let indx = 0; indx < board.length; indx++) {
      if (board[indx] === null)
      {
        full = false;
        break;
      }
    }

    if (full) return;
      
    board.forEach((cell) => {
      if (cell?.reset) cell.reset();
    });
    setBoard(Array(9).fill(null));
  }

  useEffect(() => {
    const win = checkWinner();
    if (win !== null) {
      setScore((prevScore) => ({
        player1: win === 0 ? prevScore.player1 + 1 : prevScore.player1,
        player2: win === 1 ? prevScore.player2 + 1 : prevScore.player2,
      }));
      setCountGame((prevCount) => prevCount + 1);
      setWinner(win);
    }
  }, [board]);

  const checkWinner = () => {
    const BOARD = board.map((cell) => (cell ? cell.getPlayer() : null));

    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Linhas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Colunas
      [0, 4, 8],
      [2, 4, 6], // Diagonais
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (BOARD[a] !== null && BOARD[a] === BOARD[b] && BOARD[b] === BOARD[c]) {
        return BOARD[a]; // Retorna o jogador vencedor (0 ou 1)
      }
    }
    return null;
  };

  const onBoardChange = (cellObj, index) => {
    if (winner !== null) return;
    const newBoard = [...board];
    newBoard[index] = cellObj;
    setBoard(newBoard);
    if (winner !== null) return;
    setPlayer((prevPlayer) => (prevPlayer + 1) % 2);
  };

  const clearBoard = () => {
    if (countGame > 2 || score.player1 === 2 || score.player2 === 2) {
      return;
    }
    setCountGame((prevCount) => prevCount + 1);
    addHistory();
    board.forEach((cell) => {
      if (cell?.reset) cell.reset();
    });
    setBoard(Array(9).fill(null));
    setPlayer(0);
    setWinner(null);
  };

  const resetGame = () => {
    addHistory();
    board.forEach((cell) => {
      if (cell?.reset) cell.reset();
    });
    setBoard(Array(9).fill(null));
    setScore({ player1: 0, player2: 0 });
    setCountGame(0);
    setWinner(null);
  };

  return (
    <div className="container">
      <div className="board">
        <div className="score">
          <div className="score-title">
            <div className="score-label-title">Placar</div>
          </div>
          <div className="round">
            <div className="round-label">Jogador 1 (O): </div>
            <div className="round-right-label">{score.player1}</div>
          </div>
          <div className="round">
            <div className="round-label">Jogador 2 (X): </div>
            <div className="round-right-label">{score.player2}</div>
          </div>
        </div>
        <div className="box">
          <div className="round">
            <div className="round-label">Jogada:</div>
            {player === 0 ? (
              <div className="little-circle" />
            ) : (
              <div className="x-little-shape" />
            )}
          </div>

          <div className="round">
            <div className="round-label">Vencedor:</div>
            {winner === null ? (
              <div />
            ) : winner === 0 ? (
              <div className="little-circle" />
            ) : (
              <div className="x-little-shape" />
            )}
          </div>
        </div>
        {board.map((obj, index) => (
          <CellOptimized
            key={index}
            index={index}
            cell={{ player }}
            gameover={winner !== null}
            onChange={onBoardChange}
          />
        ))}
        <div className="controls">
          <button className="button" onClick={resetGame}>
            Finalizar Jogo
          </button>
          <button className="button" onClick={resetBoard}>
            Reset
          </button>
          <button className="button" onClick={clearBoard}>
            Nova Rodada
          </button>
        </div>
        <div className="history">
          <button className="prev" onClick={prevHistory}>
            Prev
          </button>
          <div className="history-title">History ({historyIndex})</div>
          <button className="next" onClick={nextHistory}>
            Next'
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardOptimized;
