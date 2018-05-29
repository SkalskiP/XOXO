import { ActionCreator } from 'redux';
import {
    SelectGameModeAction,
    UpdateBoardAnchorPointAction,
    SetActivePlayerAction
} from './types';
import { GameMode } from '../../utils/GameMode';
import { Point } from '../../utils/geometry/Point';
import { Player } from '../../utils/Player';

export const selectGameMode: ActionCreator<SelectGameModeAction> = (mode: GameMode) => ({
    type: '@@game/SELECT_GAME_MODE',
    payload: {
        gameMode: mode
    }
});

export const updateBoardAnchorPoint: ActionCreator<UpdateBoardAnchorPointAction> = (newAnchorPoint: Point) => ({
    type: '@@game/UPDATE_BOARD_ANCHOR_POINT',
    payload: {
        boardAnchorPoint: newAnchorPoint
    }
});

export const setActivePlayer: ActionCreator<SetActivePlayerAction> = (newActivePlayer: Player) => ({
    type: '@@game/SET_ACTIVE_PLAYER',
    payload: {
        activePlayer: newActivePlayer
    }
});