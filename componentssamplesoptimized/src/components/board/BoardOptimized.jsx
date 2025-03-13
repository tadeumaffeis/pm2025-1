import { useEffect, useState } from 'react';
import CellOptimized from '../cell/CellOptimized.jsx';

export function BoardOptimized() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState(0);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        const win = checkWinner();
        if (win !== null) {
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
        board.forEach(cell => {
            if (cell?.reset) cell.reset();
        });
        setBoard(Array(9).fill(null));
        setPlayer(0);
        setWinner(null);
    };

    return (
        <>
            <div style={style.boardStyle}>
                <div style={style.scoreStyle}>Jogada: {player === 0 ? 'O' : 'X'}</div>
                <div style={style.scoreStyle}>Vencedor: {winner === null ? '_' : winner === 0 ? 'O' : 'X'}</div>
                {board.map((obj, index) => (
                    <CellOptimized
                        key={index}
                        index={index}
                        cell={{ player }}
                        gameover={winner !== null}
                        onChange={onBoardChange}
                    />
                ))}
            </div>
            <div>
                <button style={style.buttomStyle} onClick={clearBoard}>Reiniciar</button>
            </div>
        </>
    );
}

export default BoardOptimized;

const style = {
    boardStyle: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0px',
        border: '1px solid #0000FF',
    },
    scoreStyle: {
        gridColumn: 'span 3',
        textAlign: 'left',
        fontSize: '20px',
        padding: '10px',
        color: '#494955',
        border: '1px solid #0000FF',
    },
    buttomStyle: {
        marginTop: '10px',
    },
};
