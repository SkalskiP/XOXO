import * as React from 'react';
import { AppSettings } from '../settings/AppSettings';
import { Size } from '../utils/geometry/Size';
import { BoardUtil } from '../utils/BoardUtil';
import { CanvasUtil } from '../utils/CanvasUtil';
import { Point } from '../utils/geometry/Point';
import { Player } from '../utils/Player';
import { IPoint } from '../interfaces/IPoint';
import { Rect } from '../utils/geometry/Rect';
import { ApplicationState } from '../store/index';
import { Dispatch, connect } from 'react-redux';
import { updateBoardAnchorPoint,
         setActivePlayer,
         updateGameEvaluation } from '../store/game/actions';
import { ISize } from '../interfaces/ISize';
import { GameUtil } from '../logic/GameUtil';

// https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
// https://github.com/javierchavez/Gomoku/blob/master/Gomoku.java
// https://4programmers.net/Forum/Java/221325-wprowadzenie_algorytmu_minimax_do_gomoku
// https://paper.dropbox.com/doc/Program-Teoria-Gier-FxCZ4kxNLtdbrKZtqmO5C
// http://gomokuworld.com/gomoku/1

interface Props {
    boardAnchorPoint:Point;
    onNewActivePlayer: (newActivePlayer:Player) => any;
    onNewBoardAnchor: (newBoardAnchorPoint:Point) => any;
    onNewGameEvaluation: (newGameEvaluation:boolean) => any;
}

export class GameBoardComponent extends React.Component<Props, {}> {

    protected gameBoard:HTMLDivElement;
    protected boardWrapper:HTMLDivElement;
    protected activeBoard:HTMLCanvasElement;
    protected passiveBoard:HTMLCanvasElement;
    protected debugBoard:HTMLCanvasElement;

    protected cellSizePx:Size = AppSettings.boardCellSizePx;
    protected fullBoardSizeCells:Size = AppSettings.boardSizeCells;
    protected activePlayer:Player = Player.O;
    protected boardState:Player[][];
    protected displayBoardSizeCells:Size;


    public componentDidMount() {
        this.boardState = BoardUtil.initGameBoardState(this.fullBoardSizeCells);
        this.initGameBoard();
        window.addEventListener("resize", this.initGameBoard);
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.initGameBoard);
    }

    public componentDidUpdate() {
        CanvasUtil.clearCanvas(this.activeBoard);
        this.redrawBoard();
    }

    protected updateBoard = (event):void => {
        let positionOnBoard:IPoint = this.getPositionOnBoard({x: event.clientX, y: event.clientY});
        let doesMoveSucceeded = GameUtil.makeMove(this.boardState, this.activePlayer, positionOnBoard);
        if (doesMoveSucceeded) {
            let activeCellRect:Rect = BoardUtil.calculateCellRect(positionOnBoard, this.cellSizePx, this.props.boardAnchorPoint);
            CanvasUtil.drawBoardCell(this.activeBoard, activeCellRect, this.activePlayer);
            this.props.onNewGameEvaluation(GameUtil.isWin(positionOnBoard, this.boardState, this.activePlayer));
            this.swichactivePlayer();
        }
    }

    protected redrawBoard = ():void => {
        CanvasUtil.drawBoardState(this.activeBoard, this.boardState, this.cellSizePx, this.props.boardAnchorPoint);
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
            this.fullBoardSizeCells, this.cellSizePx);
        this.displayBoardSizeCells = new Size(
            calculatedBoardSizePx.width / this.cellSizePx.width,
            calculatedBoardSizePx.height / this.cellSizePx.height)
        this.boardWrapper.style.width = calculatedBoardSizePx.width + "px";
        this.boardWrapper.style.height = calculatedBoardSizePx.height + "px";
        CanvasUtil.applySizeToCanvas(this.activeBoard, calculatedBoardSizePx);
        CanvasUtil.applySizeToCanvas(this.passiveBoard, calculatedBoardSizePx);
        CanvasUtil.applySizeToCanvas(this.debugBoard, calculatedBoardSizePx);
        BoardUtil.initGrid(this.passiveBoard, this.cellSizePx);
        this.props.onNewBoardAnchor(BoardUtil.initGridAnchor(this.fullBoardSizeCells, this.displayBoardSizeCells));
    }

    public render() {
        return (
            <div className={"GameBoard"} ref = {ref => this.gameBoard = ref}>
                <div className={"BoardWrapper"} ref = {ref => this.boardWrapper = ref} onClick={this.updateBoard}>
                    <canvas className={"PassiveBoard"} ref = {ref => this.passiveBoard = ref}/>
                    <canvas className={"ActiveBoard"} ref = {ref => this.activeBoard = ref}/>
                    <canvas className={"DebugBoard"} ref = {ref => this.debugBoard = ref}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    boardAnchorPoint: state.game.boardAnchorPoint
});

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>) => ({
    onNewBoardAnchor: (newBoardAnchorPoint:Point) => dispatch(updateBoardAnchorPoint(newBoardAnchorPoint)),
    onNewActivePlayer: (newActivePlayer:Player) => dispatch(setActivePlayer(newActivePlayer)),
    onNewGameEvaluation: (newGameEvaluation:boolean) => dispatch(updateGameEvaluation(newGameEvaluation))
});

export const GameBoard = connect(mapStateToProps, mapDispatchToProps)(
    GameBoardComponent
);

