import ScoreTitle from './score-title';
import ScoreRound from './score-round';
import PropTypes from 'prop-types';
import './score.css';

// npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

export const Score = ({ score, player }) => {
    const isPlayer = [player === 0, player === 1];
    return (
        <>
            <ScoreTitle label="Placar" />
            <ScoreRound label="Jogador" score={score.player1} icon='GamerO' round={isPlayer[0]} />
            <ScoreRound label="Jogador" score={score.player2} icon='GamerX' round={isPlayer[1]} /> 
        </>
    );
}

Score.propTypes = {
    score: PropTypes.shape({
        player1: PropTypes.number.isRequired,
        player2: PropTypes.number.isRequired,
    }).isRequired,
    player: PropTypes.number.isRequired,
};

export default Score;