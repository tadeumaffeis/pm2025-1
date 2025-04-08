import React from "react";
import PropTypes from 'prop-types';

export function Container({ children, ...props }) {
    return (
        <div {...props}>
            {children}
        </div>
    );
}

Container.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
Container.defaultProps = {
    className: "",

};

export default Container;