import React, { useEffect, useState } from 'react';
import './Board.css';
import Cell from './Cell.js';

function Board() {
    const [turn, setTurn] = useState('Circle');
    const [moves, setMoves] = useState({'Circle': new Set(), 'Cross': new Set()});

    const toggleTurn = () => {
        setTurn(turn === 'Circle' ? 'Cross' : 'Circle');
    }

    const [gameEnded, setGameEnded] = useState(false);

    const checkWinner = () => {
        let winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        let cur = true;

        for(const pattern of winPatterns) {
            cur = true;
            
            for(let i = 0; i < 3; i++) {
                if(!moves['Circle'].has(pattern[i])) {
                    cur = false;
                    break;
                }
            }

            if(cur) {
                setGameEnded(true);
                break;
            }
        }

        for(const pattern of winPatterns) {
            cur = true;
            for(let i = 0; i < 3; i++) {
                if(!moves['Cross'].has(pattern[i])) {
                    cur = false;
                    break;
                }
            }

            if(cur) {
                setGameEnded(true);
                break;
            }
        }
    }
    useEffect(checkWinner, [moves])


    const addMove = (index) => {
        var newMoves = structuredClone(moves);
        newMoves[turn].add(index);
        setMoves(newMoves);
    }

    const cells = Array(9);
    for(var i = 0; i < 9; i++)
        cells[i] = <Cell toggleTurn={toggleTurn} getTurn={() => turn} addMove={addMove} getGameEnded={() => gameEnded} index={i} key={i} />;

    return (
        <div className='board'>
            <>
                {cells}
                {gameEnded ? 'Game Over' : 'Game Not Over'}
            </>
        </div>
    );
}

export default Board;