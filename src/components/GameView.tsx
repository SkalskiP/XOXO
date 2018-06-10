import * as React from 'react';
import { BoardView } from './BoardView';
import { GameOverView } from './GameOverView';
import { SettingsView } from './SettingsView';

export const GameView = () => {
    return(
        <div className={"GameView"}>
            <SettingsView/>
            <GameOverView/>
            <BoardView/>
        </div>
    );
}