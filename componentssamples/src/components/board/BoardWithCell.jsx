import {Cell} from '../cell/Cell.jsx';

export function BoardWithCell({ squares }) {
    console.log(squares);
    return (
        <div style={style.boardStyle}>
            {
                squares.map((cell, index) => 
                {
                    console.log(cell, ' ', index)
                    return (
                        <Cell 
                            key={index + 1000} // Adicionando uma key única para cada item
                            index={index + 1000} 
                            cell={cell} 
                        />
                    )
                })
            }
        </div>
    );
}

export default BoardWithCell;

const style = {
    boardStyle : {
        display : 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // Correção aqui
        gap: '0px',
        border: '1px solid #0000FF',
    },
}
