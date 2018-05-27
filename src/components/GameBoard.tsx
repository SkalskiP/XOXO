import * as React from 'react';
import { AppSettings } from '../settings/AppSettings';
import { Size } from '../utils/geometry/Size';
import { BoardUtil } from '../utils/BoardUtil';
import { CanvasUtil } from '../utils/CanvasUtil';
import { Point } from '../utils/geometry/Point';
import { Player } from '../utils/Player';
import { Game } from '../utils/Game';
import { IPoint } from '../interfaces/IPoint';

export class GameBoard extends React.Component {

    protected gameBoard:HTMLDivElement;
    protected boardWrapper:HTMLDivElement;
    protected activeBoard:HTMLCanvasElement;
    protected passiveBoard:HTMLCanvasElement;

    protected cellSizePx:Size = AppSettings.boardCellSizePx;
    protected boardSizeCells:Size = AppSettings.boardSizeCells;
    protected anchorPoint:Point;
    protected game:Game;

    public componentDidMount() {
        this.game = new Game(this.boardSizeCells);
        this.initGameBoard();
        window.addEventListener("resize", this.fitGameBoardOnRezise);
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.fitGameBoardOnRezise);
    }

    protected initGameBoard():void {
        const gameBoardRect = this.gameBoard.getBoundingClientRect();
        const calculatedBoardSize = BoardUtil.calculateBoardSize(
            {width: gameBoardRect.width, height: gameBoardRect.height},
            this.boardSizeCells, this.cellSizePx);

        this.boardWrapper.style.width = calculatedBoardSize.width + "px";
        this.boardWrapper.style.height = calculatedBoardSize.height + "px";
        CanvasUtil.applySizeToCanvas(this.activeBoard, calculatedBoardSize);
        CanvasUtil.applySizeToCanvas(this.passiveBoard, calculatedBoardSize);
        BoardUtil.initGrid(this.passiveBoard, this.cellSizePx);
        this.anchorPoint = new Point(0, 0);
    }

    protected updateBoard = (event):void => {
        const positionOnBoard:IPoint = this.getPositionOnBoard({x: event.clientX, y: event.clientY});
        this.game.makeMove(positionOnBoard);
    }

    protected fitGameBoardOnRezise = ():void => {
        this.initGameBoard();
    }

    protected getPositionOnBoard(mousePosition:IPoint):IPoint {
        const boardRect = this.boardWrapper.getBoundingClientRect();
        let positionX = mousePosition.x - boardRect.left;
        let positionY = mousePosition.y - boardRect.top;
        return {
            x: Math.floor(positionX/this.cellSizePx.width),
            y: Math.floor(positionY/this.cellSizePx.height)
        }
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
