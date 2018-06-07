import { Action } from 'redux';
import { GameMode } from '../../utils/GameMode';
import { Point } from '../../utils/geometry/Point';
import { Player } from '../../utils/Player';
import { Size } from '../../utils/geometry/Size';

export interface GameState {
    gameMode:GameMode;
    playerXName:string;
    playerOName:string;
    fullBoardSizeInCells:Size;
    boardAnchorPoint:Point;
    displayedBoardSizeInCells:Size;
    numberOfSimulatedMoves:number;
    radiousOfSimulatedField:number;
    activePlayer:Player;
    isGameOver:boolean;
}

export interface SetGameConfigurationAction extends Action {
    type: '@@game/SET_GAME_CONFIGURATION';
    payload: {
        gameMode:GameMode;
        playerXName:string;
        playerOName:string;
        fullBoardSizeInCells:Size;
        numberOfSimulatedMoves:number;
        radiousOfSimulatedField:number;
    }
}

export interface UpdateBoardAnchorPointAction extends Action {
    type: '@@game/UPDATE_BOARD_ANCHOR_POINT';
    payload: {
        boardAnchorPoint:Point;
    };
}

export interface SetBoardDimensionsAction extends Action {
    type: '@@game/SET_BOARD_DIMENSIONS';
    payload: {
        boardAnchorPoint:Point;
        displayedBoardSizeInCells:Size;
    }
}

export interface UpdateActivePlayerAction extends Action {
    type: '@@game/UPDATE_ACTIVE_PLAYER';
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

export type GameActions = 
    | SetGameConfigurationAction
    | UpdateBoardAnchorPointAction
    | SetBoardDimensionsAction
    | UpdateActivePlayerAction
    | UpdateGameEvaluationAction