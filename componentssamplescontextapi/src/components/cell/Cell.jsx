/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import XIcon from '@mui/icons-material/ClearRounded';
import OIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import { ComponentsSampleContext } from '../context/ComponentsSampleContext'; // Adjust the path as needed
import './cell.css';
export function Cell({ index, cell, gameover, onChange }) {

    const { state, dispatch } = useContext(ComponentsSampleContext);

    const renderLabel = () => {
        switch (state.board[index]?.cell) {
            case 0: {
                return <OIcon sx={{ fontSize: 40 }} className="o-icon" />;
            }
            case 1: {
                return <XIcon sx={{ fontSize: 45 }} className="x-icon" />
            }
            default:
                return <div />;
        }
    };

    const resetObj = () => {
        let newBoard = [...state.board];
        newBoard[index] = cellFactory();
        dispatch({ type: 'CHANGE_BOARD', payload: { newBoard } })
    };

    const handleClick = () => {
        if (gameover) return;
        if (state.board[index] !== null && state.board[index]?.cell !== null) return;
        const newBoard = [...state.board];
        const newCellObj = {
            index,
            cell,
            reset: () => resetObj(),
        };
        newBoard[index] = newCellObj;
        dispatch({ type: 'CHANGE_BOARD', payload: newBoard });
        onChange();
    };

    return (
        <div key={index} className="cell" onClick={handleClick}>
            {renderLabel()}
        </div>
    );
}

Cell.propTypes = {
    index: PropTypes.number.isRequired,
    cell: PropTypes.number.isRequired,
    gameover: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Cell;


function cellFactory() {
    let index = null;
    let cell = null;
    return {
        index,
        cell,
        reset: () => null,
    };
}   
