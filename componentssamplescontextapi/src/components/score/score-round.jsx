
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import './score.css';
import PropTypes from 'prop-types';

export const ScoreRound = ({ label, score, icon }) => {
    return (
        <div className="round">
            <div className="round-label">{label}</div>
            <div className="right-position">
            {
                icon === 'GamerO' 
                    ? <ClearRoundedIcon />
                    : icon === 'GamerX'
                        ? <RadioButtonUncheckedRoundedIcon />
                        : <div />
            }
            </div>
            <div className="round-right-label">{
                score === undefined || score === null
                    ? 0
                    : score
            }</div>
        </div>
    );
}

ScoreRound.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
};

export default ScoreRound;
