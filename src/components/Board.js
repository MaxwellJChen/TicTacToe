import React, { useMemo, useState } from 'react';
import './Board.css';
import Cell from './Cell.js';

function Board() {
    const [moves, setMoves] = useState({'Circle': new Set(), 'Cross': new Set()});
    const [resetCount, setResetCount] = useState(0);
    const gameDrawn = useMemo(() => moves['Circle'].size + moves['Cross'].size === 9, [moves]);
    const checkGameWon = () => {
        const getPrevTurn = () => moves['Circle'].size > moves['Cross'].size ? 'Circle' : 'Cross';

        let winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for(const pattern of winPatterns) {
            let cur = true;
            
            for(let i = 0; i < 3; i++) {
                if(!moves[getPrevTurn()].has(pattern[i])) {
                    cur = false;
                    break;
                }
            }

            if(cur)
                return true;
        }

        return false;
    }
    const gameWon = useMemo(checkGameWon, [moves]);
    const getCurTurn = () => moves['Circle'].size > moves['Cross'].size ? 'Cross' : 'Circle';
    const addMove = (index) => {
        var newMoves = structuredClone(moves);
        newMoves[getCurTurn()].add(index);
        setMoves(newMoves);
    }
    var cells = Array(9);
    for(let i = 0; i < 9; i++)
        cells[i] = <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameDrawn || gameWon} index={i} key={i} />;

    const getEndMessage = () => {
        if(gameDrawn)
            return 'Draw';  
        else if(gameWon)
            return `${moves['Circle'].size > moves['Cross'].size ? 'Circle' : 'Cross'} Wins`
    }
    const resetGame = () => {
        setMoves({'Circle': new Set(), 'Cross': new Set()});
        setResetCount((resetCount + 1) % 2);
    }

    return (
        <div id='container'>
            <div id='message-container'>
                <div className='message'>{getEndMessage()}</div>
            </div>

            <div className='board' key={resetCount}>
                {cells.map(cell => cell)}
            </div>

            <div id='restart-container' onClick={resetGame}>
                <button className='restart' hidden={!gameDrawn && !gameWon}>Restart</button>
            </div>
        </div>
    );
}

export default Board;

// const [cells, setCells] = useState([
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded || gameWon} index={0} key={0} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded || gameWon} index={1} key={1} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded || gameWon} index={2} key={2} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded || gameWon} index={3} key={3} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded || gameWon} index={4} key={4} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded || gameWon} index={5} key={5} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded || gameWon} index={6} key={6} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded || gameWon} index={7} key={7} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded || gameWon} index={8} key={8} />
// ])

// setCells([
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded} index={0} key={0 + resetCount * 9} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded} index={1} key={1 + resetCount * 9} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded} index={2} key={2 + resetCount * 9} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded} index={3} key={3 + resetCount * 9} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded} index={4} key={4 + resetCount * 9} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded} index={5} key={5 + resetCount * 9} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded} index={6} key={6 + resetCount * 9} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded} index={7} key={7 + resetCount * 9} />,
//     <Cell getCurTurn={getCurTurn} addMove={addMove} getGameEnded={() => gameEnded} index={8} key={8 + resetCount * 9} />
// ]);