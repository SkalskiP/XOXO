import { ISize } from '../interfaces/ISize';
import { CanvasUtil } from './CanvasUtil';

export class BoardUtil {

    public static calculateBoardSize(maxBoardSizePx:ISize, maxBoardSizeCells:ISize, cellSizePx:ISize):ISize {
        let numberOfHorizontalCells = Math.min(
            Math.floor(maxBoardSizePx.width / cellSizePx.width), 
            maxBoardSizeCells.width
        );
        let numberOfVerticalCells = Math.min(
            Math.floor(maxBoardSizePx.height / cellSizePx.height), 
            maxBoardSizeCells.height
        );
        return {
            width: numberOfHorizontalCells * cellSizePx.width,
            height: numberOfVerticalCells * cellSizePx.height
        }
    }

    public static initGrid(canvas:HTMLCanvasElement, cellSizePx:ISize) {
        CanvasUtil.clearCanvas(canvas);
        let boardWidthCells = canvas.width / cellSizePx.width;
        let boardHeightCells = canvas.height / cellSizePx.height;

        for(let i = 1; i < boardHeightCells; i++) {
            CanvasUtil.drawLine(canvas, {x: 0, y: cellSizePx.height * i}, {x: canvas.width, y: cellSizePx.height * i});
        }

        for(let j = 1; j < boardWidthCells; j++) {
            CanvasUtil.drawLine(canvas, {x: cellSizePx.width * j, y: 0}, {x: cellSizePx.width * j, y: canvas.height});
        }
    }
}