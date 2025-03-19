import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import PropTypes from 'prop-types';
import './winner.css';

export const Winner = ({ winner }) => {
    return (
        <div className="winner">
            <div className="winner-label">Vencedor</div>
            <div  className="right-position">
                {winner === null
                    ? <div />
                    : winner === 0
                        ? <RadioButtonUncheckedRoundedIcon sx={{ fontSize: 40 }} className='icon'/>
                        : <ClearRoundedIcon sx={{ fontSize: 45 }} className='icon'/>
                }
            </div>
        </div>    
    );
}

Winner.propTypes = {
    winner: PropTypes.number,
};

export default Winner;