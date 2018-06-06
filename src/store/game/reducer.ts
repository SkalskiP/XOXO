
import { Reducer } from 'redux';
import {
    GameState,
    GameActions
} from './types';
import { GameMode } from '../../utils/GameMode';
import { Player } from '../../utils/Player';

export const gameReducer: Reducer<GameState> = (
  state: GameState = null,
  action: GameActions
) => {
  switch (action.type) {
    case '@@game/SELECT_GAME_MODE':
      return {
        ...state,
        gameMode: action.payload.gameMode
      };
    case '@@game/UPDATE_BOARD_ANCHOR_POINT':
      console.log(action.payload.boardAnchorPoint.toString())
      return {
        ...state,
        boardAnchorPoint: action.payload.boardAnchorPoint
      };
    case '@@game/SET_ACTIVE_PLAYER':
    console.log("Active palyer is: " + action.payload.activePlayer)
      return {
        ...state,
        activePlayer: action.payload.activePlayer
      };
    case '@@game/UPDATE_GAME_EVALUATION':
      console.log("Game is over: " + action.payload.isGameOver)
      return {
        ...state,
        isGameOver: action.payload.isGameOver
      };
    case '@@game/SET_PLAYERS_NAMES':
      return {
        ...state,
        playerOName: action.payload.playerOName,
        playerXName: action.payload.playerXName
      };
    default:
      return state;
  }
};

export default gameReducer;