import { useState } from 'react';
import './cell.css';

export function Cell({ index, cell, onChange }) {   
    const renderLabel = (i) => {
        if (cell === 0) return <div>O</div>;
        if (cell === 1) return <div>X</div>;
        return <div></div>;
    };
    return (
        <div key={index + 1000} className="cell" onClick={() => onChange(index)}> 
            {
                renderLabel(index)
            }
        </div>
    );
    /*
        outra maneira de renderizar o jogador
        {player === 0 ? <br>O</br> : player === 1 ? <br>X</br> : null}
    */
}

export default Cell;

const style = {
    cellStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #0000FF',
        width: '100px',
        height: '100px',
        fontFamily: 'arial',
        fontSize: '30px'
    },
}
