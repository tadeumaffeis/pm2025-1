
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './score.css';
import PropTypes from 'prop-types';

export const ScoreRound = ({ label, score, icon, round }) => {
    return (
        <div className="round">
            <div className="round-label">{label}</div>
            <div className="right-position">
            {
                icon === 'GamerX' 
                    ? <ClearRoundedIcon />
                    : icon === 'GamerO'
                        ? <RadioButtonUncheckedRoundedIcon />
                        : <div />
            }
            </div>
            <div className="right-position">
            {
                round && round === true
                    ? <div className="round-right-label"><ArrowBackIosIcon className="arrow" /></div>
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
    round: PropTypes.boolean,
};

export default ScoreRound;
