import { useContext, useEffect, useState } from 'react';
import { ComponentsSampleContext } from '../context/ComponentsSampleContext'; // Adjust the path as needed
import CellOptimized from '../cell/CellOptimized.jsx';
import './board.css';
import Score from '../score/score.jsx';
import Winner from '../winner/winner.jsx';

export function BoardOptimized() {
    //const [board, setBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState(0);
    const [winner, setWinner] = useState(null);
    const [score, setScore] = useState({ player1: 0, player2: 0 });
    const [countGame, setCountGame] = useState(0);  

    const context = useContext(ComponentsSampleContext);
    context.state.board = Array(9).fill(null);
    const [board, setBoard] = useState(context.state.board);

    useEffect(() => {
        const win = checkWinner();
        if (win !== null) {
            setScore(prevScore => ({
                player1: win === 0 ? prevScore.player1 + 1 : prevScore.player1,
                player2: win === 1 ? prevScore.player2 + 1 : prevScore.player2
            }));
            setCountGame(prevCount => prevCount + 1);
            setWinner(win);
        }
    }, [board]);

    const checkWinner = () => {
        const BOARD = board.map(cell => (cell ? cell.getPlayer() : null));

        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
            [0, 4, 8], [2, 4, 6]             // Diagonais
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
        setPlayer(prevPlayer => (prevPlayer + 1) % 2);
    };

    const clearBoard = () => {
        if (countGame > 2 || score.player1 === 2 || score.player2 === 2) {  
            return;
        }
        board.forEach(cell => {
            if (cell?.reset) cell.reset();
        });
        setBoard(Array(9).fill(null));
        setPlayer(0);
        setWinner(null);
    };

    const resetGame = () => {
        setScore({ player1: 0, player2: 0 });
        setCountGame(0);
        clearBoard();
    };

    return (
        <div className="container">
            <div className="board">
                <Score score={score} player={ player} />
                <Winner winner={winner} />
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
                    <button className="button" onClick={resetGame}>Finalizar Jogo</button>
                    <button className="button" onClick={clearBoard}>Nova Rodada</button>
                </div>
            </div>
        </div>
    );
}

export default BoardOptimized;
