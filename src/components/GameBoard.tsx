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
         setActivePlayer } from '../store/game/actions';
import { ISize } from '../interfaces/ISize';
import { GameUtil } from '../logic/GameUtil';

// https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
// https://github.com/javierchavez/Gomoku/blob/master/Gomoku.java
// https://4programmers.net/Forum/Java/221325-wprowadzenie_algorytmu_minimax_do_gomoku
// https://paper.dropbox.com/doc/Program-Teoria-Gier-FxCZ4kxNLtdbrKZtqmO5C
// http://gomokuworld.com/gomoku/1

interface Props {
    activePlayer:Player;
    boardAnchorPoint:Point;
    onNewActivePlayer: (newActivePlayer:Player) => any;
    onNewBoardAnchor: (newBoardAnchorPoint:Point) => any;
}

export class GameBoardComponent extends React.Component<Props, {}> {

    protected gameBoard:HTMLDivElement;
    protected boardWrapper:HTMLDivElement;
    protected activeBoard:HTMLCanvasElement;
    protected passiveBoard:HTMLCanvasElement;

    protected cellSizePx:Size = AppSettings.boardCellSizePx;
    protected fullBoardSizeCells:Size = AppSettings.boardSizeCells;
    protected boardState:Player[][];
    protected displayBoardSizeCells:Size;


    public componentDidMount() {
        this.initGameBoardState(this.fullBoardSizeCells);
        this.initGameBoard();
        window.addEventListener("resize", this.fitGameBoardOnRezise);
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.fitGameBoardOnRezise);
    }

    public componentDidUpdate() {
        CanvasUtil.clearCanvas(this.activeBoard);
        this.redrawBoard();
    }

    protected initGameBoardState(boardSize:ISize) {
        this.boardState = [];
        for(let i = 0; i < boardSize.width; i++) {
            this.boardState.push(new Array(boardSize.height).fill(0));
        }
    }

    protected initGameBoard():void {
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
        BoardUtil.initGrid(this.passiveBoard, this.cellSizePx);
        this.props.onNewBoardAnchor(BoardUtil.initGridAnchor(this.fullBoardSizeCells, this.displayBoardSizeCells));
    }

    protected updateBoard = (event):void => {
        const positionOnBoard:IPoint = this.getPositionOnBoard({x: event.clientX, y: event.clientY});

        if(this.boardState[positionOnBoard.x][positionOnBoard.y] === Player.NONE) {
            this.boardState[positionOnBoard.x][positionOnBoard.y] = this.props.activePlayer;

            let activeCellRect:Rect = BoardUtil.calculateCellRect(positionOnBoard, this.cellSizePx, this.props.boardAnchorPoint);

            if(this.props.activePlayer === Player.O)
                CanvasUtil.drawO(this.activeBoard, activeCellRect);
            else if(this.props.activePlayer === Player.X)
                CanvasUtil.drawX(this.activeBoard, activeCellRect);
            this.swichactivePlayer();
        }
    }

    protected redrawBoard = ():void => {
        this.boardState.forEach((row:Player[], rowIndex) => {
            row.forEach((cell:Player, columnIndex) => {
                let cellRect:Rect = BoardUtil.calculateCellRect({x: rowIndex, y: columnIndex}, this.cellSizePx, this.props.boardAnchorPoint);
                if(cell === Player.O) {
                    CanvasUtil.drawO(this.activeBoard, cellRect);
                }
                else if(cell === Player.X)
                    CanvasUtil.drawX(this.activeBoard, cellRect);
            });
        })
    }

    protected fitGameBoardOnRezise = ():void => {
        this.initGameBoard();
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
        if(this.props.activePlayer === Player.X)
            this.props.onNewActivePlayer(Player.O);
        else
            this.props.onNewActivePlayer(Player.X);
    }

    public render() {
        return (
            <div className={"GameBoard"} ref = {ref => this.gameBoard = ref}>
                <div className={"BoardWrapper"} ref = {ref => this.boardWrapper = ref} onClick={this.updateBoard}>
                    <canvas className={"PassiveBoard"} ref = {ref => this.passiveBoard = ref}/>
                    <canvas className={"ActiveBoard"} ref = {ref => this.activeBoard = ref}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    boardAnchorPoint: state.game.boardAnchorPoint,
    activePlayer: state.game.activePlayer
});

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>) => ({
    onNewBoardAnchor: (newBoardAnchorPoint:Point) => dispatch(updateBoardAnchorPoint(newBoardAnchorPoint)),
    onNewActivePlayer: (newActivePlayer:Player) => dispatch(setActivePlayer(newActivePlayer))
});

export const GameBoard = connect(mapStateToProps, mapDispatchToProps)(
    GameBoardComponent
);

