import React from "react";
import PropTypes from 'prop-types';

export function SubContainer({ children, ...props }) {
    return (
        <div {...props}>
            {children}
        </div>
    );
}

SubContainer.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
SubContainer.defaultProps = {
    className: "",

};

export default SubContainer;
