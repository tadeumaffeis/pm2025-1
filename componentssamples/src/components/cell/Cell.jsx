import { useState } from 'react';
import './cell.css';

export function Cell({ index, cell }) {

    const [label,setLabel] = useState("");
    
    const handleClick = () => {
        if (label === "") {
            setLabel(cell);
        }
        else
        {
            setLabel("");
        }
    }
    
    return (
        <div key={index + 1000} className="cell" onClick={handleClick}> 
            {label}
        </div>
    );
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
