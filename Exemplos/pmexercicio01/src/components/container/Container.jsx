import { Children } from "react";

export function Container({width = '500px', height='500px', border, children}) {
    const style = {
        width,
        height,
        border,
    };
    console.log('container')
    return (
        <div style={style}>
            {children}
        </div>
    )
}

export default Container;