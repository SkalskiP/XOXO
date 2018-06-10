
import { Reducer } from 'redux';
import {
    GameState,
    GameActions
} from './types';

export const gameReducer: Reducer<GameState> = (
  state: GameState = null,
  action: GameActions
) => {
  switch (action.type) {
    case '@@game/SET_GAME_CONFIGURATION':
      return {
        ...state,
        gameMode: action.payload.gameMode,
        playerXName: action.payload.playerXName,
        playerOName: action.payload.playerOName,
        fullBoardSizeInCells: action.payload.fullBoardSizeInCells,
        numberOfSimulatedMoves: action.payload.numberOfSimulatedMoves,
        radiousOfSimulatedField: action.payload.radiousOfSimulatedField,
        startPlayer: action.payload.startPlayer
      };
    case '@@game/UPDATE_BOARD_ANCHOR_POINT':
      return {
        ...state,
        boardAnchorPoint: action.payload.boardAnchorPoint
      };
    case '@@game/SET_BOARD_DIMENSIONS':
      return {
        ...state,
        boardAnchorPoint: action.payload.boardAnchorPoint,
        displayedBoardSizeInCells: action.payload.displayedBoardSizeInCells
      }
    case '@@game/UPDATE_ACTIVE_PLAYER':
      return {
        ...state,
        activePlayer: action.payload.activePlayer
      };
    case '@@game/UPDATE_GAME_EVALUATION':
      return {
        ...state,
        isGameOver: action.payload.isGameOver
      };
    case '@@game/OPEN_SETTINGS_WINDOW':
    console.log("Is settings window open? : " + action.payload.isSettingsWindowOpened);
      return {
        ...state,
        isSettingsWindowOpened: action.payload.isSettingsWindowOpened
      }
    default:
      return state;
  }
};

export default gameReducer;