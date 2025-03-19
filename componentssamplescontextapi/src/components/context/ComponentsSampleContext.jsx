import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

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
        switch (action.type) {
            case 'CHANGE_BOARD':
                return { ...state, board: action.payload };
            case 'CHANGE_PLAYER':
                return { ...state, player: action.payload };
            case 'CHANGE_WINNER':
                return { ...state, winner: action.payload };
            case 'CHANGE_SCORE':
                return { ...state, score: action.payload };
            case 'CHANGE_COUNT_GAME':
                return { ...state, countGame: action.payload };
            default:
                return state;
        }
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
