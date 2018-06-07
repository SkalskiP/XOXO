import * as React from 'react';
import { BoardView } from './BoardView';
import { Player } from '../utils/Player';
import { ApplicationState } from '../store/index';
import { connect } from 'react-redux';

interface Props {
    activePlayer:Player;
    isGameOver:boolean;
    playerXName:string;
    playerOName:string;
}

export class GameOverViewComponent extends React.Component<Props, {}> {

    private getActivePlayerName() {
        if(this.props.activePlayer === Player.X)
            return this.props.playerXName
        else
            return this.props.playerOName
    }

    public render() {
        return(
            this.props.isGameOver ? <div className={"GameOverView"}>
                <span>GAME OVER</span>
                <span>{this.getActivePlayerName()}</span>
                <span>WON</span>
            </div> : null
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    activePlayer: state.game.activePlayer,
    isGameOver: state.game.isGameOver,
    playerXName: state.game.playerXName,
    playerOName: state.game.playerOName
    
});

export const GameOverView = connect(mapStateToProps)(
    GameOverViewComponent
);