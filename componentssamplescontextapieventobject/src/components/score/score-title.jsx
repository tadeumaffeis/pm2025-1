import './score.css';
import PropTypes from 'prop-types';

export const ScoreTitle = ({ label } ) => {
    return (
        <div className="score-title">
            <div className="score-label-title">{ label }</div>
        </div>
    );
}

ScoreTitle.propTypes = {
        label: PropTypes.string.isRequired,
};

export default ScoreTitle;