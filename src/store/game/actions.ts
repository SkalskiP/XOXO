import { ActionCreator } from 'redux';
import {
    SetGameConfigurationAction,
    UpdateBoardAnchorPointAction,
    SetBoardDimensionsAction,
    UpdateActivePlayerAction,
    UpdateGameEvaluationAction,
    OpenSettingsWindowAction
} from './types';
import { GameMode } from '../../utils/GameMode';
import { Point } from '../../utils/geometry/Point';
import { Player } from '../../utils/Player';
import { Size } from '../../utils/geometry/Size';


export const setGameConfiguration: ActionCreator<SetGameConfigurationAction> = (
    selectedGameMode:GameMode, selectedPlayerXName:string, selectedPlayerOName:string, selectedBoardSizeInCells:Size,
    selectedNumberOfSimulatedMoves:number, selectedRadiousOfSimulatedField:number, selectedActivePlayer:Player) => ({
    type: '@@game/SET_GAME_CONFIGURATION',
    payload: {
        gameMode: selectedGameMode,
        playerXName: selectedPlayerXName,
        playerOName: selectedPlayerOName,
        fullBoardSizeInCells: selectedBoardSizeInCells,
        numberOfSimulatedMoves: selectedNumberOfSimulatedMoves,
        radiousOfSimulatedField: selectedRadiousOfSimulatedField
    }
});

export const updateBoardAnchorPoint: ActionCreator<UpdateBoardAnchorPointAction> = (newAnchorPoint: Point) => ({
    type: '@@game/UPDATE_BOARD_ANCHOR_POINT',
    payload: {
        boardAnchorPoint: newAnchorPoint
    }
});

export const setBoardDimensions: ActionCreator<SetBoardDimensionsAction> = (newAnchorPoint: Point, newDisplayedSizeInCells:Size) => ({
    type: '@@game/SET_BOARD_DIMENSIONS',
    payload: {
        boardAnchorPoint: newAnchorPoint,
        displayedBoardSizeInCells: newDisplayedSizeInCells
    }
});

export const updateActivePlayer: ActionCreator<UpdateActivePlayerAction> = (newActivePlayer: Player) => ({
    type: '@@game/UPDATE_ACTIVE_PLAYER',
    payload: {
        activePlayer: newActivePlayer
    }
});

export const updateGameEvaluation: ActionCreator<UpdateGameEvaluationAction> = (gameEvaluation: boolean) => ({
    type: '@@game/UPDATE_GAME_EVALUATION',
    payload: {
        isGameOver: gameEvaluation
    }
});

export const openSettingsWindow: ActionCreator<OpenSettingsWindowAction> = (settingsWindowStatus: boolean) => ({
    type: '@@game/OPEN_SETTINGS_WINDOW',
    payload: {
        isSettingsWindowOpened: settingsWindowStatus
    }
});