import { createContext } from 'react';
import PropTypes from 'prop-types';

// Criar o contexto uma única vez
// eslint-disable-next-line react-refresh/only-export-components
export const ComponentsSampleContext = createContext({});

export const ComponentsSampleProvider = ({ children }) => {
    return (
        <ComponentsSampleContext.Provider value={{ state: { board: [] } }}>
            {children}
        </ComponentsSampleContext.Provider>
    );
};

ComponentsSampleProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ComponentsSampleProvider;
