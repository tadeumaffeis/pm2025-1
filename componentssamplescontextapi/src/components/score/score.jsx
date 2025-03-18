import ScoreTitle from './score-title';
import ScoreRound from './score-round';
import PropTypes from 'prop-types';
import './score.css';

// npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

export const Score = ( score ) => {
    return (
        <>
            <ScoreTitle label="Placar" />
            <ScoreRound label="Jogador" score={score.player1} icon='GamerO' />
            <ScoreRound label="Jogador" score={score.player2} icon='GamerX' /> 
        </>
    );
}

Score.propTypes = {
    score: PropTypes.shape({
        player1: PropTypes.number.isRequired,
        player2: PropTypes.number.isRequired,
    }).isRequired,
};

export default Score;