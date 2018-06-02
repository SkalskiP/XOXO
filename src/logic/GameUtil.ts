import { Point } from '../utils/geometry/Point';
import { Player } from '../utils/Player';
import { IPoint } from '../interfaces/IPoint';
import { AppSettings } from '../settings/AppSettings';
import { Size } from '../utils/geometry/Size';
import { Rect } from '../utils/geometry/Rect';

export class GameUtil {
    public static isWin(lastMove:Point, boardState:Player[][], activePlayer:Player):boolean {
        let lenOfWinningChain = 5;

        let maxFoundChainLen = 0;
        let horizontalChainLen = 0;
        let verticalChainLen = 0;
        let diagonal1ChainLen = 0;
        let diagonal2ChainLen = 0;

        for(let i = -lenOfWinningChain; i <= lenOfWinningChain; i++) {

            let x = lastMove.x - i;
            let y = lastMove.y - i;
            let yRev = lastMove.y + i;

            if(GameUtil.isMoveInBoard({x, y: lastMove.y}) && boardState[x][lastMove.y] === activePlayer)
                horizontalChainLen++;
            else if(horizontalChainLen > maxFoundChainLen) {
                maxFoundChainLen = horizontalChainLen;
                horizontalChainLen = 0;
            }

            if(GameUtil.isMoveInBoard({x: lastMove.x, y}) && boardState[lastMove.x][y] === activePlayer)
                verticalChainLen++;
            else if(verticalChainLen > maxFoundChainLen) {
                maxFoundChainLen = verticalChainLen;
                verticalChainLen = 0;
            }

            if(GameUtil.isMoveInBoard({x, y}) && boardState[x][y] === activePlayer)
                diagonal1ChainLen++;
            else if(diagonal1ChainLen > maxFoundChainLen) {
                maxFoundChainLen = diagonal1ChainLen;
                diagonal1ChainLen = 0;
            }

            if(GameUtil.isMoveInBoard({x, y: yRev}) && boardState[x][yRev] === activePlayer)
                diagonal2ChainLen++;
            else if(diagonal2ChainLen > maxFoundChainLen) {
                maxFoundChainLen = diagonal2ChainLen;
                diagonal2ChainLen = 0;
            }
        }
        return maxFoundChainLen === lenOfWinningChain;
    }

    public static getPossibleMoves(boardState:Player[][], padding:number = 1):Point[] {
        let moves:Point[] = [];
        let boardRect:Rect = new Rect(0, 0, boardState.length, boardState[0].length);
        
        boardState.forEach((column:Player[], hIndex) => {
            column.forEach((cell:Player, vIndex) => {
                if(boardState[hIndex][vIndex] === Player.NONE) {

                    let possibleMoveRect = boardRect.getCommonWithRect({
                        x: hIndex - padding,
                        y: vIndex - padding,
                        width: 1 + 2 * padding,
                        height: 1 + 2 * padding
                    })

                    loop:
                    for(let hI = possibleMoveRect.x; hI < possibleMoveRect.x + possibleMoveRect.width; hI++) {
                        for(let vI = possibleMoveRect.y; vI < possibleMoveRect.y + possibleMoveRect.height; vI++) {
                            if(boardState[hI][vI] !== Player.NONE) {
                                moves.push(new Point(vIndex, hIndex));
                                break loop;
                            }
                        }
                    }
                }
            });
        })
        return moves;
    }

    public static getDefaultMove(boardState:Player[][]):Point {
        return new Point(Math.floor(boardState.length/2), Math.floor(boardState[0].length/2))
    }

    public static isMoveInBoard(move:IPoint, boardSize:Size = AppSettings.boardSizeCells):boolean {
        return move.x >= 0 && move.x < boardSize.width && move.y >= 0 && move.y < boardSize.height;
    }
}