
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
    case '@@game/SET_GAME_CONFIGURATION':
      return {
        ...state,
        gameMode: action.payload.gameMode,
        playerXName: action.payload.playerXName,
        playerOName: action.payload.playerOName,
        fullBoardSizeInCells: action.payload.fullBoardSizeInCells,
        numberOfSimulatedMoves: action.payload.numberOfSimulatedMoves,
        radiousOfSimulatedField: action.payload.radiousOfSimulatedField
      };
    case '@@game/UPDATE_BOARD_ANCHOR_POINT':
      console.log(action.payload.boardAnchorPoint.toString())
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

    default:
      return state;
  }
};

export default gameReducer;