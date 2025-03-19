import { useContext, useEffect } from 'react'; // Adjust the path as needed
import Score from '../score/score.jsx';
import Winner from '../winner/winner.jsx';
import Body from '../body/Body.jsx';
import { ActionEvent } from '../event/ActionEvent.js';
import { ComponentsSampleContext } from '../context/ComponentsSampleContext.jsx';
import './board.css';

export function Board() {

    const boardEvent = new ActionEvent(ActionEvent.CHANGE_BOARD);
    const playerEvent = new ActionEvent(ActionEvent.CHANGE_PLAYER);
    const scoreEvent = new ActionEvent(ActionEvent.CHANGE_SCORE);
    const countGameEvent = new ActionEvent(ActionEvent.CHANGE_COUNT_GAME);
    const winnerEvent = new ActionEvent(ActionEvent.CHANGE_WINNER);

    const { state, dispatch } = useContext(ComponentsSampleContext);

    useEffect(() => {
        const win = checkWinner();
        if (win !== null) {
            const prevScore = state.score;
            dispatch(scoreEvent.register({
                player1: win === 0 ? prevScore.player1 + 1 : prevScore.player1,
                player2: win === 1 ? prevScore.player2 + 1 : prevScore.player2
            }).getEvent());

            dispatch(
                countGameEvent.register(state.countGame + 1).getEvent()
            );  
            dispatch(
                winnerEvent.register(win).getEvent()
            );
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
        dispatch(
            playerEvent.register((state.player + 1) % 2).getEvent()
        );
    };

    const clearBoard = () => {
        if (state.countGame > 2 || state.score.player1 === 2 || state.score.player2 === 2) {  
            return;
        }
        dispatch(
            boardEvent.register(Array(9).fill(null)).getEvent()
        );
        dispatch(
            winnerEvent.register(null).getEvent()
        );
    };

    const resetGame = () => {
        dispatch(
            scoreEvent.register({ player1: 0, player2: 0 }).getEvent()
        );
        dispatch(
            countGameEvent.register(0).getEvent()
        );
        dispatch(
            boardEvent.register(Array(9).fill(null)).getEvent()
        );
        dispatch(
            winnerEvent.register(null).getEvent()
        );
    };

    return (
        <div className="container">
            <div className="board">
                <Score score={state.score} player={state.player} />
                <Winner winner={state.winner} />
                <Body onChange={onBoardChange} />
                <div className="controls">
                    <button className="button" onClick={resetGame}>Finalizar Jogo</button>
                    <button className="button" onClick={clearBoard}>Nova Rodada</button>
                </div>
            </div>
        </div>
    );
}

export default Board;
