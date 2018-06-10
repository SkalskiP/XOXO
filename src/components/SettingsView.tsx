import * as React from 'react';
import { ApplicationState } from '../store/index';
import { connect, Dispatch } from 'react-redux';
import { openSettingsWindow,
         setGameConfiguration } from '../store/game/actions';
import { GameMode } from '../utils/GameMode';
import { Player } from '../utils/Player';
import { Size } from '../utils/geometry/Size';

interface Props {
    playerXName:string;
    playerOName:string;
    gameMode:GameMode;
    fullBoardSizeInCells:Size;
    isSettingsWindowOpened:boolean;
    activePlayer:Player;
    numberOfSimulatedMoves:number;
    radiousOfSimulatedField:number;
    saveNewGameSettings: (gameMode:GameMode, playerXName:string, playerOName:string, fullBoardSizeInCells:Size, 
        numberOfSimulatedMoves:number, radiousOfSimulatedField:number) => any;
}

interface State {
    playerXName:string;
    playerOName:string;
    gameMode:GameMode;
    numberOfSimulatedMoves:number;
    radiousOfSimulatedField:number;
    fullBoardSizeInCells:Size;
}

export class SettingsViewComponent extends React.Component<Props, State> {

    constructor (props) {
        super(props);
        this.state = {
            playerOName: this.props.playerOName,
            playerXName: this.props.playerXName,
            gameMode: this.props.gameMode,
            numberOfSimulatedMoves: this.props.numberOfSimulatedMoves,
            radiousOfSimulatedField: this.props.radiousOfSimulatedField,
            fullBoardSizeInCells: this.props.fullBoardSizeInCells
        };
    }

    protected handleSubmit = (event) => {
        this.props.saveNewGameSettings(this.state.gameMode, this.state.playerXName, this.state.playerOName,
        this.state.fullBoardSizeInCells, this.state.numberOfSimulatedMoves, this.state.radiousOfSimulatedField)
        event.preventDefault();
    }

    protected handleGameModeChange = (event) => {
        this.setState({ gameMode: event.target.value });
    }

    protected handlePlayerONameChange = (event) => {
        this.setState({ playerOName: event.target.value });
    }
    
    protected handlePlayerXNameChange = (event) => {
        this.setState({ playerXName: event.target.value });
    }

    protected handleNumberOfSimulatedMovesChange = (event) => {
        this.setState({numberOfSimulatedMoves: parseInt(event.target.value, 10)});
    }

    protected handleRadiousOfSimulatedMovesChange = (event) => {
        this.setState({radiousOfSimulatedField: parseInt(event.target.value, 10)});
    }

    protected handleBoardWidthChange = (event) => {
        this.setState({ fullBoardSizeInCells: new Size(
            parseInt(event.target.value, 10),
            this.state.fullBoardSizeInCells.height
        ) });
    }

    protected handleBoardHeightChange = (event) => {
        this.setState({ fullBoardSizeInCells: new Size(
            this.state.fullBoardSizeInCells.width,
            parseInt(event.target.value, 10)
        ) });
    }

    public render() {

        return(
            this.props.isSettingsWindowOpened ? <div className={"SettingsView"}>
                <form onSubmit={this.handleSubmit}>

                        <label htmlFor={"gameMode"}> 
                            GAME MODE
                        </label>
                        <select defaultValue={this.props.gameMode} name={"gameMode"} onChange={this.handleGameModeChange}>
                            {/* <option value={GameMode.BOT_VS_BOT}>Simulation</option> */}
                            <option value={GameMode.BOT_VS_PLAYER}>Single Player</option>
                            <option value={GameMode.PLAYER_VS_PLAYER}>Multi Player</option>
                        </select>

                        <label htmlFor={"playerOName"}> 
                            PLAYER O NAME
                        </label>
                        <input type="text" defaultValue={this.props.playerOName} name={"playerOName"} onChange={this.handlePlayerONameChange}/>

                        <label htmlFor={"playerXName"}> 
                            PLAYER X NAME
                        </label>
                        <input type="text" defaultValue={this.props.playerXName} name={"playerXName"} onChange={this.handlePlayerXNameChange}/>

                        {/* <label htmlFor={"boardWidth"}> 
                            BOARD WIDTH
                        </label>
                        <input type="number" defaultValue={this.props.fullBoardSizeInCells.width.toString()} name={"boardWidth"} onChange={this.handleBoardWidthChange}/>

                        <label htmlFor={"boardHeight"}> 
                            BOARD HEIGHT
                        </label>
                        <input type="number" defaultValue={this.props.fullBoardSizeInCells.height.toString()} name={"boardHeight"} onChange={this.handleBoardHeightChange}/> */}

                        <label htmlFor={"numberOfSimulatedMoves"}>
                            NUMBER OF SIMULATED MOVES
                        </label>
                        <select defaultValue={this.props.numberOfSimulatedMoves.toString()} name={"numberOfSimulatedMoves"} onChange={this.handleNumberOfSimulatedMovesChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>

                        <label htmlFor={"radiousOfSimulatedMoves"}>
                            RADIOUS OF SIMULATED MOVES
                        </label>
                        <select defaultValue={this.props.radiousOfSimulatedField.toString()} name={"radiousOfSimulatedMoves"} onChange={this.handleRadiousOfSimulatedMovesChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
 
                    <input type="submit" value="SUBMIT" />
                </form>
            </div> : null
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    playerXName: state.game.playerXName,
    playerOName: state.game.playerOName,
    gameMode: state.game.gameMode,
    fullBoardSizeInCells: state.game.fullBoardSizeInCells,
    activePlayer: state.game.activePlayer,
    isSettingsWindowOpened: state.game.isSettingsWindowOpened,
    numberOfSimulatedMoves: state.game.numberOfSimulatedMoves,
    radiousOfSimulatedField: state.game.radiousOfSimulatedField
});

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>) => ({
    saveNewGameSettings: (gameMode:GameMode, playerXName:string, playerOName:string, fullBoardSizeInCells:Size, 
        numberOfSimulatedMoves:number, radiousOfSimulatedField:number) => {
            dispatch(setGameConfiguration(
                gameMode, playerXName, playerOName, fullBoardSizeInCells, numberOfSimulatedMoves, radiousOfSimulatedField
            ));
            dispatch(openSettingsWindow(false));
        }
});

export const SettingsView = connect(mapStateToProps, mapDispatchToProps)(
    SettingsViewComponent
);