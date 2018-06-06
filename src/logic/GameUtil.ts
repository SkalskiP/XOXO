import { Point } from '../utils/geometry/Point';
import { Player } from '../utils/Player';
import { IPoint } from '../interfaces/IPoint';
import { AppSettings } from '../settings/AppSettings';
import { Size } from '../utils/geometry/Size';
import { Rect } from '../utils/geometry/Rect';
import { IMinMaxMove } from '../interfaces/IMinMaxMove';
import _ from 'underscore'
import { ISize } from '../interfaces/ISize';
import { BoardUtil } from '../utils/BoardUtil';

export class GameUtil {

    public static makeMove(boardState:Player[][], activePlayer:Player, move:IPoint):boolean {
        if(boardState[move.x][move.y] === Player.NONE) {
            boardState[move.x][move.y] = activePlayer;
            return true;
        }
        return false;

    }

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

    public static getNextMove(boardState:Player[][], depth:number, isMaximizingPlayer:boolean, padding:number = 1):Point {
        console.log("GET NEXT MOVE")
        console.log(boardState);
        let possibleMoves = GameUtil.getPossibleMoves(boardState, padding);
        // console.log(possibleMoves);
        console.log(boardState);

        // Board is empty, bot place his pawn in the middle
        if(possibleMoves.length === 0) {
            return GameUtil.getDefaultMove(boardState);
        }

        // Player to maximize
        let currentPlayer = isMaximizingPlayer ? Player.O : Player.X;

        let moves:IMinMaxMove[] = possibleMoves.map((move:Point) => {
            boardState[move.x][move.y] = currentPlayer;
            let moveEvaluation:number = GameUtil.minMax(boardState, move, depth - 1, isMaximizingPlayer, padding);
            boardState[move.x][move.y] = Player.NONE;
            return {
                position: move,
                value: moveEvaluation
            };
        })

        console.log(moves);

        _.sortBy(moves, 'value');

        if(isMaximizingPlayer)
            return moves[0].position;
        else
            return moves.slice(-1)[0].position

    }

    public static minMax(boardState:Player[][], currentMove:Point, depth:number, isMaximizingPlayer:boolean, padding:number = 1):number {
        // Player to maximize
        let currentPlayer = isMaximizingPlayer ? Player.O : Player.X;
        
        // Evaluate if this move is game winning
        let isWon = GameUtil.isWin(currentMove, boardState, currentPlayer);

        // Value of currentPlayer for maximized player is 1 and for other one is -1
        if(isWon) {
            return currentPlayer * 100;
        }  
        else if(depth === 0) {
            return 0;
        }
        else {
            // Looking for possible moves
            let possibleMoves = GameUtil.getPossibleMoves(boardState, padding);
            // Player to make next move
            let nextPlayer = !isMaximizingPlayer ? Player.O : Player.X;
            // Recurrence
            let moves:IMinMaxMove[] = possibleMoves.map((move:Point) => {
                // Adding move to board
                boardState[move.x][move.y] = nextPlayer;
                // Evaluationg next move
                let moveEvaluation:number = this.minMax(boardState, move, depth - 1, !isMaximizingPlayer, padding);
                // Remove move from board
                boardState[currentMove.x][currentMove.y] = Player.NONE;
                return {
                    position: move,
                    value: moveEvaluation
                };
            });

            _.sortBy(moves, 'value');

            if(isMaximizingPlayer)
                return moves[0].value;
            else
                return moves[moves.length - 1].value
        }
    }
}