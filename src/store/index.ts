import { Reducer } from 'redux';
import { GameState } from './game/types';
import { combineReducers } from 'redux';
import { gameReducer } from './game/reducer';

export interface ApplicationState {
  game: GameState;
}

export const rootReducer: Reducer<ApplicationState> = combineReducers({
    game: gameReducer
});