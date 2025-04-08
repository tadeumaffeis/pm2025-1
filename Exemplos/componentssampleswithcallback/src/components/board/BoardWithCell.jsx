import { useState } from 'react';
import { Cell } from '../cell/Cell.jsx';

export function BoardWithCell() {
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
    const [player, setPlayer] = useState(0);
    const [winner, setWinner] = useState(null);
    const getPlayer = () => {
        return player;
    }
    function checkWinner(_board) {
        console.log("_board 1: ", _board);
        if (_board === undefined || _board === null) {
            _board = [...board];
        }
        console.log("_board 2: ", _board);
        const BOARD = [[_board[0], _board[1], _board[2]], [_board[3], _board[4], _board[5]], [_board[6], _board[7], _board[8]]];
        for (let i = 0; i < 3; i++) {
            // Verifica as linhas
            if (BOARD[i][0] !== '' && BOARD[i][0] === BOARD[i][1] && BOARD[i][1] === BOARD[i][2]) {
                return BOARD[i][0]; // Retorna o jogador vencedor (0 ou 1)
            }

            // Verifica as colunas
            if (BOARD[0][i] !== '' && BOARD[0][i] === BOARD[1][i] && BOARD[1][i] === BOARD[2][i]) {
                return BOARD[0][i]; // Retorna o jogador vencedor (0 ou 1)
            }
        }

        // Verifica a diagonal principal
        if (BOARD[0][0] !== '' && BOARD[0][0] === BOARD[1][1] && BOARD[1][1] === BOARD[2][2]) {
            return BOARD[0][0]; // Retorna o jogador vencedor (0 ou 1)
        }

        // Verifica a diagonal secundária
        if (BOARD[0][2] !== '' && BOARD[0][2] === BOARD[1][1] && BOARD[1][1] === BOARD[2][0]) {
            return BOARD[0][2]; // Retorna o jogador vencedor (0 ou 1)
        }

        return null; // Retorna null se ninguém venceu ainda
    }
    const onBoardChange = (index) => {
        let auxBoard = [...board];
        let win = null;
        if (winner !== null) {
            return;
        }
        if (auxBoard[index] === '') {
            auxBoard[index] = player;
            let win = checkWinner(auxBoard);
            if (win !== null) {
                setWinner(win);
            }
            else {
                setPlayer((player + 1) % 2);
            }
            setBoard(auxBoard);
        }
    }

    return (
        <>
            <div>
                <div>
                    <h3>
                        Jogada: {player === 0 ? '0' : 'X'}
                    </h3>
                </div>
            </div>
            <div>
                {
                    winner !== null && <div><h3>Vencedor: {winner === 0 ? '0' : 'X'} </h3></div>
                }
            </div>
            <div style={style.boardStyle}>
                {
                    board.map((cell, index) => {
                        return (
                            <Cell
                                key={index + 1000} // Adicionando uma key única para cada item
                                index={index}
                                cell={cell}
                                onChange={(i) => onBoardChange(i)}
                            />
                        )
                    })
                }
            </div>
        </>
    );
}

export default BoardWithCell;

const style = {
    boardStyle: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // Correção aqui
        gap: '0px',
        border: '1px solid #0000FF',
    },
}
