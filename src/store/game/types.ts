import { Action } from 'redux';
import { GameMode } from '../../utils/GameMode';
import { Point } from '../../utils/geometry/Point';
import { Player } from '../../utils/Player';

export interface GameState {
    gameMode:GameMode;
    boardAnchorPoint:Point;
    activePlayer:Player;
    isGameOver:boolean;
    playerXName:string;
    playerOName:string;
}

export interface SelectGameModeAction extends Action {
    type: '@@game/SELECT_GAME_MODE';
    payload: {
        gameMode:GameMode;
    };
}

export interface UpdateBoardAnchorPointAction extends Action {
    type: '@@game/UPDATE_BOARD_ANCHOR_POINT';
    payload: {
        boardAnchorPoint:Point;
    };
}

export interface SetActivePlayerAction extends Action {
    type: '@@game/SET_ACTIVE_PLAYER';
    payload: {
        activePlayer:Player;
    }
}

export interface UpdateGameEvaluationAction extends Action {
    type: '@@game/UPDATE_GAME_EVALUATION';
    payload: {
        isGameOver:boolean;
    };
}

export interface SetPlayersNamesAction extends Action {
    type: '@@game/SET_PLAYERS_NAMES';
    payload: {
        playerXName:string;
        playerOName:string;
    };
}

export type GameActions = 
    | SelectGameModeAction
    | UpdateBoardAnchorPointAction
    | SetActivePlayerAction
    | UpdateGameEvaluationAction
    | SetPlayersNamesAction