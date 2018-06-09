import * as React from 'react';
import { BoardView } from './BoardView';
import { Player } from '../utils/Player';
import { ApplicationState } from '../store/index';
import { connect, Dispatch } from 'react-redux';
import { SimpleButton } from './SimpleButton';
import { updateGameEvaluation } from '../store/game/actions';

interface Props {
    activePlayer:Player;
    isGameOver:boolean;
    playerXName:string;
    playerOName:string;
    restartGame: () => any;
}

export class GameOverViewComponent extends React.Component<Props, {}> {

    protected getActivePlayerName() {
        if(this.props.activePlayer === Player.X)
            return this.props.playerXName
        else
            return this.props.playerOName
    }

    protected startNewGame = ():void => {
        this.props.restartGame();
    }

    public render() {

        let buttonStyle:React.CSSProperties = {
            width: "40%",
            maxWidth: 100,
            minWidth: 50,
            height: 45,
            marginTop: 20
        }

        return(
            this.props.isGameOver ? <div className={"GameOverView"}>
                <span id={"GameOverHeading"}>GAME OVER</span>
                <span>{this.getActivePlayerName()} WON</span>
                <SimpleButton name={"TRY AGAIN"} style={buttonStyle} onClick={this.startNewGame}/>
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

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>) => ({
    restartGame: () => dispatch(updateGameEvaluation(false))
});

export const GameOverView = connect(mapStateToProps, mapDispatchToProps)(
    GameOverViewComponent
);