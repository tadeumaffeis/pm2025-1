/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect } from 'react';
import { ComponentsSampleContext } from '../context/ComponentsSampleContext.jsx'; // Adjust the path as needed
import Cell from '../cell/Cell.jsx';
import './body.css';

export function Body({ onChange}) {

    const { state, dispatch } = useContext(ComponentsSampleContext);
    return (
            <>
                {state.board.map((obj, index) => (
                    <Cell
                        key={index}
                        index={index}
                        cell={state.player }
                        gameover={state.winner !== null}
                        onChange={onChange}
                    />
                ))}
            </>
    );
}

export default Body;
