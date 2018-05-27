import * as React from 'react';
import { AppSettings } from '../settings/AppSettings';
import { Size } from '../utils/geometry/Size';
import { BoardUtil } from '../utils/BoardUtil';
import { CanvasUtil } from '../utils/CanvasUtil';

export class GameBoard extends React.Component {

    protected gameBoard:HTMLDivElement;
    protected boardWrapper:HTMLDivElement;
    protected activeBoard:HTMLCanvasElement;
    protected passiveBoard:HTMLCanvasElement;

    protected cellSizePx:Size = AppSettings.boardCellSizePx;
    protected boardSizeCells:Size = AppSettings.boardSizeCells;

    public componentDidMount() {
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
        BoardUtil.initGrid(this.passiveBoard, this.cellSizePx)
    }

    protected fitGameBoardOnRezise = ():void => {
        this.initGameBoard();
    }

    public render() {
        return (
            <div className={"GameBoard"} ref = {ref => this.gameBoard = ref}>
                <div className={"BoardWrapper"} ref = {ref => this.boardWrapper = ref}>
                    <canvas className={"PassiveBoard"} ref = {ref => this.passiveBoard = ref}/>
                    <canvas className={"ActiveBoard"} ref = {ref => this.activeBoard = ref}/>
                </div>
            </div>
        );
    }
}
