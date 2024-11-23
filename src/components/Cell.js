import React, { useState } from 'react';
import './Cell.css';
import Circle from '../Assets/Circle.png';
import Cross from '../Assets/Cross.png';

function Cell(props) {
    const [clicked, setClicked] = useState(false);
    const [turn, setTurn] = useState('');

    const onClick = () => {
        if(!clicked && !props.getGameEnded()) {
            setClicked(true);
            setTurn(props.getCurTurn());
            props.addMove(props.index);
        }
    }

    return (
        <div className={(clicked || props.getGameEnded()) ? 'cell no-hover' : 'cell'} onClick={onClick}>
            { clicked && <img src={turn === "Circle" ? Circle : Cross} alt={turn}/> }
        </div>
    );

}

export default Cell;