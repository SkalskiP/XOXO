import { applyMiddleware, createStore, Store } from 'redux';
import { ApplicationState, rootReducer } from './store';
import { GameState } from './store/game/types';
import { GameMode } from './utils/GameMode';
import { Player } from './utils/Player';


const initialApplicationState: ApplicationState = {
    game: {
        gameMode: GameMode.PLAYER_VS_PLAYER,
        boardAnchorPoint: null,
        activePlayer: Player.O
    }
};

export default function configureStore(
    initialState: ApplicationState = initialApplicationState): Store<ApplicationState> {
    return createStore(
        rootReducer,
        initialState
    )
}