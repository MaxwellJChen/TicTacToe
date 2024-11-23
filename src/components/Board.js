import React, { useMemo, useState } from 'react';
import './Board.css';
import Cell from './Cell.js';

function Board() {
    // Record moves by each side
    const [moves, setMoves] = useState({'Circle': new Set(), 'Cross': new Set()});

    // Record variable used to toggle key for board and reset cells
    const [resetCount, setResetCount] = useState(0);

    // Check whether game has been drawn every time moves are updated
    const gameDrawn = useMemo(() => moves['Circle'].size + moves['Cross'].size === 9, [moves]);

    // Check whether game has been won by iterating through patterns every time moves are updated
    const checkGameWon = () => {
        const getPrevTurn = () => moves['Circle'].size > moves['Cross'].size ? 'Circle' : 'Cross';

        let winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for(let i = 1; i < 9; i++) {
            let pattern = winPatterns[i - 1];
            let cur = true;
            
            for(let j = 0; j < 3; j++) {
                if(!moves[getPrevTurn()].has(pattern[j])) {
                    cur = false;
                    break;
                }
            }

            if(cur)
                return i;
        }

        return 0;
    }
    const gameWon = useMemo(checkGameWon, [moves]);

    const lineConfigs = {
        1: ['hor-line', '165px', '0px'],
        2: ['hor-line', '355px', '0px'],
        3: ['hor-line', '545px', '0px'],
        4: ['vert-line', '80px', '85px'],
        5: ['vert-line', '80px', '275px'],
        6: ['vert-line', '80px', '465px'],
        7: ['neg-diag', '-25px', '275px'],
        8: ['pos-diag', '-25px', '275px'],
    }

    // Get current turn based on count of moves for each side
    const getCurTurn = () => moves['Circle'].size > moves['Cross'].size ? 'Cross' : 'Circle';

    // Add a new move in child cell
    const addMove = (index) => {
        var newMoves = structuredClone(moves);
        newMoves[getCurTurn()].add(index);
        setMoves(newMoves);
    }

    // Store 9 child cells in an array
    var cells = Array(9);
    for(let i = 0; i < 9; i++)
        cells[i] = <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameDrawn || gameWon} index={i} key={i} />;

    // Get the final game message
    const getEndMessage = () => {
        if(gameWon)
            return `${moves['Circle'].size > moves['Cross'].size ? 'Circle' : 'Cross'} Wins`
        else if(gameDrawn)
            return 'Draw';
    }

    // Reset the game's move and div key
    const resetGame = () => {
        setMoves({'Circle': new Set(), 'Cross': new Set()});
        setResetCount((resetCount + 1) % 2);
    }

    return (
        <div id='container'>
            <div id='mini-container'>
                <div className='message'>{getEndMessage()}</div>
            </div>

            <div className='board' key={resetCount}>
                {cells.map(cell => cell)}
            </div>

            {gameWon !== 0 && <div className={`line ${lineConfigs[gameWon][0]}`} style={{top: lineConfigs[gameWon][1], left: lineConfigs[gameWon][2]}} />}

            <div id='mini-container' onClick={resetGame}>
                <button className='message' hidden={!gameDrawn && !gameWon} id='restart'>Restart</button>
            </div>
        </div>
    );
}

export default Board;