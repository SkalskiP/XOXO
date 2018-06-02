import { ISize } from '../interfaces/ISize';
import { IPoint } from "../interfaces/IPoint";
import { Player } from '../utils/Player';
import { GameUtil } from './GameUtil';
import { Point } from '../utils/geometry/Point';
import { ApplicationState } from '../store/index';
import { Dispatch } from 'react-redux';
import _ from 'underscore'

// https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
// https://github.com/javierchavez/Gomoku/blob/master/Gomoku.java
// https://4programmers.net/Forum/Java/221325-wprowadzenie_algorytmu_minimax_do_gomoku
// https://paper.dropbox.com/doc/Program-Teoria-Gier-FxCZ4kxNLtdbrKZtqmO5C
// http://gomokuworld.com/gomoku/1

interface IMinMaxMove {
    position:Point,
    value:number
} 

export class Game {
    public activePlayer:Player;
    public boardState:Player[][];

    constructor(boadSize:ISize) {
        this.initGameState(boadSize);
    }

    public initGameState(boardSize:ISize) {
        this.activePlayer = Player.X;
        this.boardState = [];
        for(let i = 0; i < boardSize.width; i++) {
            this.boardState.push(new Array(boardSize.height).fill(0));
        }
    }

    public makeMove(position:IPoint):boolean {
        if(this.isPositionOccupied(position))
            return false;
        this.boardState[position.x][position.y] = this.activePlayer;
        return true;
    }

    public isPositionOccupied(position:IPoint):boolean {
        return this.boardState[position.x][position.y] !== 0
    }

    public swichactivePlayer() {
        if(this.activePlayer === Player.X)
            this.activePlayer = Player.O
        else
            this.activePlayer = Player.X
    }

    public getNextMove(boardState:Player[][], depth:number, isMaximizingPlayer:boolean, padding:number = 1):Point {
        let possibleMoves = GameUtil.getPossibleMoves(boardState, padding);

        // Board is empty, bot place his pawn in the middle
        if(possibleMoves.length === 0) {
            return GameUtil.getDefaultMove(boardState);
        }

        let moves:IMinMaxMove[] = possibleMoves.map((move:Point) => {
            return this.minMax(boardState, move, depth - 1, isMaximizingPlayer, padding);
        })

        _.sortBy(moves, 'value');

        if(isMaximizingPlayer)
            return moves[0].position;
        else
            return moves[moves.length - 1].position

    }

    public minMax(boardState:Player[][], nextMove:Point, depth:number, isMaximizingPlayer:boolean, padding:number = 1):IMinMaxMove {
        // Player to maximize
        let currentPlayer = isMaximizingPlayer ? Player.O : Player.X;
        
        // Adding move to board
        boardState[nextMove.x][nextMove.y] = currentPlayer;

        // Evaluate if this move is game winning
        let isWon = GameUtil.isWin(nextMove, boardState, currentPlayer);
  
        let possibleMoves = GameUtil.getPossibleMoves(boardState, padding);
        // Recurrence
        let moves:IMinMaxMove[] = possibleMoves.map((move:Point) => {
            return this.minMax(boardState, move, depth - 1, !isMaximizingPlayer, padding);
        })

        // Remove move from board
        boardState[nextMove.x][nextMove.y] = Player.NONE;

        if(isWon) {
            return {
                position: nextMove,
                value: currentPlayer * 100
            }
        }  
        else if(depth === 0) {
            return {
                position: nextMove,
                value: 0
            }
        }

    }
}