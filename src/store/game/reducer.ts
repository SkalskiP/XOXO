
import { Reducer } from 'redux';
import {
    GameState,
    GameActions
} from './types';
import { GameMode } from '../../utils/GameMode';
import { Player } from '../../utils/Player';

// export const initialState: GameState = {
//     gameMode: GameMode.PLAYER_VS_PLAYER,
//     boardAnchorPoint: null,
//     activePlayer: Player.O
// };

export const gameReducer: Reducer<GameState> = (
//   state: GameState = initialState,
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
      return {
        ...state,
        activePlayer: action.payload.activePlayer
      };
    default:
      return state;
  }
};

export default gameReducer;