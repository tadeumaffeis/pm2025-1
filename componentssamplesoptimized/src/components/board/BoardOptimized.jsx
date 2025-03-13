import { useEffect, useState } from 'react';
import CellOptimized from '../cell/CellOptimized.jsx';

export function BoardOptimized() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState(0);
    const [winner, setWinner] = useState(null);

    // Verifica o vencedor após cada atualização do board
    useEffect(() => {
        const win = checkWinner();
        if (win !== null) {
            setWinner(win);
        }
    }, [board]); // 🚀 Agora o vencedor é verificado corretamente após cada jogada

    // Função para verificar o vencedor
    const checkWinner = () => {
        const BOARD = [
            [board[0], board[1], board[2]],
            [board[3], board[4], board[5]],
            [board[6], board[7], board[8]],
        ];

        for (let i = 0; i < 3; i++) {
            if (BOARD[i][0] !== null && BOARD[i][0] === BOARD[i][1] && BOARD[i][1] === BOARD[i][2]) {
                return BOARD[i][0];
            }
            if (BOARD[0][i] !== null && BOARD[0][i] === BOARD[1][i] && BOARD[1][i] === BOARD[2][i]) {
                return BOARD[0][i];
            }
        }

        if (BOARD[0][0] !== null && BOARD[0][0] === BOARD[1][1] && BOARD[1][1] === BOARD[2][2]) return BOARD[0][0];
        if (BOARD[0][2] !== null && BOARD[0][2] === BOARD[1][1] && BOARD[1][1] === BOARD[2][0]) return BOARD[0][2];

        return null;
    };

    // Atualiza o tabuleiro quando um jogador faz uma jogada
    const onBoardChange = (index) => {
        if (board[index] !== null || winner !== null) return; // Impede jogadas inválidas

        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);

        setPlayer((prevPlayer) => (prevPlayer + 1) % 2);
    };

    const clearBoard = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
    };

    return (
        <>
           
            <div style={style.boardStyle}>
                <div style={style.scoreStyle}>Jogada: {player === 0 ? 'O' : 'X'}</div>
                <div style={style.scoreStyle}>Vencedor: {winner === null ? '_' : winner === 0 ? 'O' : 'X'}</div>
                {board.map((cell, index) => (
                    <CellOptimized
                        key={index}
                        index={index}
                        cell={cell}
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
