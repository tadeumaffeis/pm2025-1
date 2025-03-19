import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { ActionEvent } from '../event/ActionEvent';

// Criar o contexto uma única vez
// eslint-disable-next-line react-refresh/only-export-components
export const ComponentsSampleContext = createContext({});

const inititalState = {
    board: Array(9).fill(null),
    player: 0,
    winner: null,
    score: { player1: 0, player2: 0 },
    countGame: 0,
};

export const ComponentsSampleProvider = ({ children }) => {
    // reducer function
    const reducerBoard = (state, action) => {
        console.log('state: ', state, ' action: ', action);
        const payload = new ActionEvent(action.type).register(action.payload).getReducerState();
        console.log('payload: ', payload, ' state: ', state);
        const retEvent = { ...state, ...payload };
        return retEvent;
    };

    const [state, dispatch] = useReducer(reducerBoard, inititalState);
    return (
        <ComponentsSampleContext.Provider value={{ state, dispatch }}>
            {children}
        </ComponentsSampleContext.Provider>
    );
};

ComponentsSampleProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ComponentsSampleProvider;
