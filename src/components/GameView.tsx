import * as React from 'react';
import { BoardView } from './BoardView';
import { GameOverView } from './GameOverView';

export const GameView = () => {
    return(
        <div className={"GameView"}>
            <GameOverView/>
            <BoardView/>
        </div>
    );
}