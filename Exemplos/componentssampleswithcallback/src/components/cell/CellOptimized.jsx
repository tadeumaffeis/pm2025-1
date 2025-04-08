import { useState } from 'react';
import PropTypes from 'prop-types';
import './cell.css';

export function CellOptimized({ index, cell, onChange }) {
    // eslint-disable-next-line no-unused-vars
    const [select, setCellSelect] = useState(null);

    //const isCellSelected = () => select !== null; // ✅ Agora retorna corretamente

    const renderLabel = () => {

        if (cell === 0) {
            return <div className="circle" />;
        }
        if (cell === 1) {
            return <div className='x-shape' />;
        }
        return <div></div>;
    };

    console.log('index:', index);

    return (
        <div 
            key={index + 1000} 
            className="cell" 
            onClick={() => {
                setCellSelect(cell); // ✅ Atualiza o estado APENAS no clique, não na renderização
                onChange(index);
            }}
        >
            {renderLabel()}
        </div>
    );
}

CellOptimized.propTypes = {
    index: PropTypes.number.isRequired,
    cell: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CellOptimized;
