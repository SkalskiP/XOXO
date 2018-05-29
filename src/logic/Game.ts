import { ISize } from '../interfaces/ISize';
import { IPoint } from "../interfaces/IPoint";
import { Player } from '../utils/Player';

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
        this.boardState[position.y][position.x] = this.activePlayer;
        return true;
    }

    public isPositionOccupied(position:IPoint):boolean {
        return this.boardState[position.y][position.x] !== 0
    }

    public swichactivePlayer() {
        if(this.activePlayer === Player.X)
            this.activePlayer = Player.O
        else
            this.activePlayer = Player.X
    }
}