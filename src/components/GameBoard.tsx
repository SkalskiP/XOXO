import * as React from 'react';
import { Size } from '../utils/geometry/Size';
import { BoardUtil } from '../utils/BoardUtil';
import { CanvasUtil } from '../utils/CanvasUtil';
import { Point } from '../utils/geometry/Point';
import { Player } from '../utils/Player';
import { IPoint } from '../interfaces/IPoint';
import { Rect } from '../utils/geometry/Rect';
import { ApplicationState } from '../store/index';
import { Dispatch, connect } from 'react-redux';
import { setBoardDimensions,
         updateActivePlayer,
         updateGameEvaluation } from '../store/game/actions';
import { ISize } from '../interfaces/ISize';
import { GameUtil } from '../logic/GameUtil';
import { GameMode } from '../utils/GameMode';
import { AppSettings } from '../settings/AppSettings';

interface Props {
    gameMode:GameMode;
    fullBoardSizeInCells:Size;
    boardAnchorPoint:Point;
    displayedBoardSizeInCells:Size;
    numberOfSimulatedMoves:number;
    radiousOfSimulatedField:number;
    onNewActivePlayer: (newActivePlayer:Player) => any;
    onBoardRecalculation: (newBoardAnchorPoint:Point, newDisplayedSizeInCells:Size) => any;
    onNewGameEvaluation: (newGameEvaluation:boolean) => any;
}

export class GameBoardComponent extends React.Component<Props, {}> {

    protected gameBoard:HTMLDivElement;
    protected boardWrapper:HTMLDivElement;
    protected activeBoard:HTMLCanvasElement;
    protected passiveBoard:HTMLCanvasElement;
    protected debugBoard:HTMLCanvasElement;
    
    protected cellSizePx:Size = AppSettings.boardCellSizePx;
    protected activePlayer:Player = Player.O;
    protected boardState:Player[][];


    public componentDidMount() {
        this.boardState = BoardUtil.initGameBoardState(this.props.fullBoardSizeInCells);
        this.initGameBoard();
        window.addEventListener("resize", this.initGameBoard);
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.initGameBoard);
    }

    public componentDidUpdate() {
        CanvasUtil.clearCanvas(this.activeBoard);
        CanvasUtil.clearCanvas(this.debugBoard);
        this.redrawBoard();
    }

    protected livePlayerMakesMove = (event):void => {
        let positionOnBoard:IPoint = this.getPositionOnBoard({x: event.clientX, y: event.clientY});
        this.makeMove(positionOnBoard);
        this.botPlayerMakesMove();
    }

    protected botPlayerMakesMove():void {
        CanvasUtil.clearCanvas(this.debugBoard);
        let possibleMoves = GameUtil.getPossibleMoves(this.boardState, 1);
        possibleMoves.forEach((move:Point) => {
            let cellRect:Rect = BoardUtil.calculateCellRect(move, this.cellSizePx, this.props.boardAnchorPoint);
            CanvasUtil.fillRectWithColor(this.debugBoard, cellRect, AppSettings.possibleMoveRGBA);
        });
        let nextMove = GameUtil.getNextMove(this.boardState, this.props.numberOfSimulatedMoves, this.activePlayer === AppSettings.playerToMaximize, this.props.radiousOfSimulatedField); 
        this.makeMove(nextMove);
    }

    protected makeMove(move:IPoint) {
        let doesMoveSucceeded = GameUtil.makeMove(this.boardState, this.activePlayer, move);
        if (doesMoveSucceeded) {
            let activeCellRect:Rect = BoardUtil.calculateCellRect(move, this.cellSizePx, this.props.boardAnchorPoint);
            CanvasUtil.drawBoardCell(this.activeBoard, activeCellRect, this.activePlayer);
            this.props.onNewGameEvaluation(GameUtil.isWin(move, this.boardState, this.activePlayer));
            this.swichactivePlayer();
        }
    }

    protected redrawBoard = ():void => {
        CanvasUtil.drawBoardState(this.activeBoard, this.boardState, this.props.displayedBoardSizeInCells, this.props.fullBoardSizeInCells, this.cellSizePx, this.props.boardAnchorPoint);
    }

    protected getPositionOnBoard(mousePosition:IPoint):IPoint {
        const boardRect = this.boardWrapper.getBoundingClientRect();
        let positionX = mousePosition.x - boardRect.left;
        let positionY = mousePosition.y - boardRect.top;
        return {
            x: Math.floor(positionX/this.cellSizePx.width) + this.props.boardAnchorPoint.x,
            y: Math.floor(positionY/this.cellSizePx.height) + this.props.boardAnchorPoint.y
        }
    }

    protected swichactivePlayer() {
        let newPlayer:Player = this.activePlayer === Player.X ? Player.O : Player.X;
        this.props.onNewActivePlayer(newPlayer);
        this.activePlayer = newPlayer;      
    }

    protected initGameBoard = ():void => {
        const gameBoardRect = this.gameBoard.getBoundingClientRect();
        const calculatedBoardSizePx = BoardUtil.calculateDisplayBoardSizePx(
            {width: gameBoardRect.width, height: gameBoardRect.height},
            this.props.fullBoardSizeInCells, this.cellSizePx);
        const displayedBoardSizeInCells:Size = new Size(
            calculatedBoardSizePx.width / this.cellSizePx.width,
            calculatedBoardSizePx.height / this.cellSizePx.height)
        this.boardWrapper.style.width = calculatedBoardSizePx.width + "px";
        this.boardWrapper.style.height = calculatedBoardSizePx.height + "px";
        CanvasUtil.applySizeToCanvas(this.activeBoard, calculatedBoardSizePx);
        CanvasUtil.applySizeToCanvas(this.passiveBoard, calculatedBoardSizePx);
        CanvasUtil.applySizeToCanvas(this.debugBoard, calculatedBoardSizePx);
        BoardUtil.initGrid(this.passiveBoard, this.cellSizePx);
        this.props.onBoardRecalculation(
            BoardUtil.initGridAnchor(this.props.fullBoardSizeInCells, displayedBoardSizeInCells), 
            displayedBoardSizeInCells);
    }

    public render() {
        console.log('GAME BOARD RENDER');
        return (
            <div className={"GameBoard"} ref = {ref => this.gameBoard = ref}>
                <div className={"BoardWrapper"} ref = {ref => this.boardWrapper = ref} onClick={this.livePlayerMakesMove}>
                    <canvas className={"DebugBoard"} ref = {ref => this.debugBoard = ref}/>
                    <canvas className={"PassiveBoard"} ref = {ref => this.passiveBoard = ref}/>
                    <canvas className={"ActiveBoard"} ref = {ref => this.activeBoard = ref}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    gameMode: state.game.gameMode,
    fullBoardSizeInCells: state.game.fullBoardSizeInCells,
    boardAnchorPoint: state.game.boardAnchorPoint,
    displayedBoardSizeInCells: state.game.displayedBoardSizeInCells,
    numberOfSimulatedMoves: state.game.numberOfSimulatedMoves,
    radiousOfSimulatedField: state.game.radiousOfSimulatedField
});

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>) => ({
    onBoardRecalculation: (newBoardAnchorPoint:Point, newDisplayedSizeInCells) => dispatch(setBoardDimensions(newBoardAnchorPoint, newDisplayedSizeInCells)),
    onNewActivePlayer: (newActivePlayer:Player) => dispatch(updateActivePlayer(newActivePlayer)),
    onNewGameEvaluation: (newGameEvaluation:boolean) => dispatch(updateGameEvaluation(newGameEvaluation))
});

export const GameBoard = connect(mapStateToProps, mapDispatchToProps)(
    GameBoardComponent
);

