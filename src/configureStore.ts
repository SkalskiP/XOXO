import { applyMiddleware, createStore, Store } from 'redux';
import { ApplicationState, rootReducer } from './store';
import { GameState } from './store/game/types';
import { GameMode } from './utils/GameMode';
import { Player } from './utils/Player';
import { AppSettings } from './settings/AppSettings';


const initialApplicationState: ApplicationState = {
    game: {
        gameMode: GameMode.PLAYER_VS_PLAYER,
        playerOName: "PLAYER_O",
        playerXName: "PLAYER_X",
        fullBoardSizeInCells: AppSettings.boardSizeCells,
        boardAnchorPoint: null,
        displayedBoardSizeInCells: null,
        numberOfSimulatedMoves: AppSettings.numberOfSimulatedMoves,
        radiousOfSimulatedField: AppSettings.radiousOfSimulatedField,
        activePlayer: Player.O,
        isGameOver: false,        
    }
};

export default function configureStore(
    initialState: ApplicationState = initialApplicationState): Store<ApplicationState> {
    return createStore(
        rootReducer,
        initialState
    )
}