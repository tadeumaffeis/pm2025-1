
export function BoardWithoutCell({ squares }) {
    return (
        <>
            <div style={style.boardStyle}>
                {
                    squares.map((cell, index) => 
                    {
                        console.log("index: ", index, " cell: ", cell);
                        return (
                            <div key={index} style={style.cellStyle}>
                                {cell}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export function CompArg(size)
{
    console.log("log: ", size)
    return (
    <div>
        {size}
    </div> )
}

export default BoardWithoutCell;

const style = {
    boardStyle : {
        display : 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2px',
    },
    cellStyle : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        border : '2px solid #0000FF',
        width  : '100px',
        height : '100px', 
    }
}
