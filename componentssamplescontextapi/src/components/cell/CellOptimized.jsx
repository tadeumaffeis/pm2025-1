/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PropTypes from 'prop-types';
import './cell.css';

export function CellOptimized({ index, cell, gameover, onChange }) {
    const [cellObj, setCellObj] = useState(cellFactory());

    const renderLabel = () => {
        if (cellObj?.getPlayer) {
            return cellObj.getPlayer() === 0 
                ? <div className="circle" /> 
                : cellObj.getPlayer() === 1 
                ? <div className="x-shape" /> 
                : <div />;
        }
        return <div />;
    };

    const getPlayer = () => (cellObj ? cellObj.cell : null);
    const resetObj = () => setCellObj(cellFactory());

    const handleClick = () => {
        if (gameover) return;
        if (cellObj !== null && cellObj.cell !== null) return;
        const newCellObj = {
            index,
            cell,
            getPlayer: () => cell?.player ?? null,
            reset: () => resetObj(),
        };
        setCellObj(newCellObj);
        onChange(newCellObj, index);
        console.log('newCellObj:', newCellObj);
    };

    return (
        <div key={index} className="cell" onClick={handleClick}>
            {renderLabel()}
        </div>
    );
}

CellOptimized.propTypes = {
    index: PropTypes.number.isRequired,
    cell: PropTypes.number.isRequired,
    gameover: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CellOptimized;


function cellFactory() {
    let index = null;
    let cell = null;
    return {
        index,
        cell,
        getPlayer: () => null,
        getCell: () => null,
    };
}   
