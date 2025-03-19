import { useContext, useEffect } from 'react';
import { ComponentsSampleContext } from '../context/ComponentsSampleContext.jsx'; // Adjust the path as needed
import Cell from '../cell/Cell.jsx';
import './board.css';
import Score from '../score/score.jsx';
import Winner from '../winner/winner.jsx';

export function Board() {

    const { state, dispatch } = useContext(ComponentsSampleContext);

    useEffect(() => {
        const win = checkWinner();
        if (win !== null) {
            const prevScore = state.score;
            dispatch({ type: 'CHANGE_SCORE', payload: {
                player1: win === 0 ? prevScore.player1 + 1 : prevScore.player1,
                player2: win === 1 ? prevScore.player2 + 1 : prevScore.player2
            }});
            dispatch({ type: 'CHANGE_COUNT_GAME', payload: state.countGame + 1 });
            dispatch({ type: 'CHANGE_WINNER', payload: win });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.board]);

    const checkWinner = () => {
        const BOARD = state.board.map(content => (content ? content.cell : null));

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

    const onBoardChange = () => {
        if (state.winner !== null) return;
        dispatch({ type: 'CHANGE_PLAYER', payload: (state.player + 1) % 2 });
    };

    const clearBoard = () => {
        if (state.countGame > 2 || state.score.player1 === 2 || state.score.player2 === 2) {  
            return;
        }

        dispatch({ type: 'CHANGE_BOARD', payload: Array(9).fill(null) });
        dispatch({ type: 'CHANGE_WINNER', payload: null });
    };

    const resetGame = () => {
        dispatch({ type: 'CHANGE_SCORE', payload: {
            player1: 0,
            player2: 0,
        }
        });
        dispatch({ type: 'CHANGE_COUNT_GAME', payload: 0 });
        dispatch({ type: 'CHANGE_BOARD', payload: Array(9).fill(null) });
        dispatch({ type: 'CHANGE_WINNER', payload: null });
    };

    return (
        <div className="container">
            <div className="board">
                <Score score={state.score} player={ state.player} />
                <Winner winner={state.winner} />
                {state.board.map((obj, index) => (
                    <Cell
                        key={index}
                        index={index}
                        cell={state.player }
                        gameover={state.winner !== null}
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

export default Board;
