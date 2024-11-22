import React, { useState } from 'react';
import './Cell.css';
import Circle from '../assets/Circle.png';
import Cross from '../assets/Cross.png';

function Cell(props) {
    const [clicked, setClicked] = useState(false);
    const [turn, setTurn] = useState('');

    const onClick = () => {
        if(!clicked) {
            setClicked(true);
            setTurn(props.getTurn());
            props.toggleTurn();

            props.addMove(props.index);
        }
    }

    return (
        <div className={clicked ? 'cell no-hover' : 'cell'} onClick={onClick}>
            { clicked && <img src={turn === "Circle" ? Circle : Cross} alt={turn}/> }
        </div>
    );

}

export default Cell;