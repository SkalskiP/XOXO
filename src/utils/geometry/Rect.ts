import { IRect } from '../../interfaces/IRect';
import { Point } from './Point';
import { IPoint } from '../../interfaces/IPoint';

export class Rect implements IRect {

    public x:number;
    public y:number;
    public width:number;
    public height:number;

    constructor(x:number, y:number, width:number, height:number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public getCenterPoint():Point {
        let centerX:number = this.x + this.width/2;
        let centerY:number = this.y + this.height/2;
        return(new Point(centerX, centerY));
    }

    public translateByVector(vector:IPoint) {
        this.x = this.x + vector.x;
        this.y = this.y + vector.y;
        return this;
    }

    public inflateByVector(vector:IPoint) {
        this.x = this.x - vector.x / 2;
        this.y = this.y - vector.y / 2;
        this.width = this.width + vector.x;
        this.height = this.height + vector.y;
        return this;
    }

    public getCommonWithRect(rect:IRect):IRect {
        let left = Math.max(this.x, rect.x);
        let right = Math.min(this.x + this.width, rect.x + rect.width)
        let top = Math.max(this.y, rect.y);
        let bottom = Math.min(this.y + this.height, rect.y + rect.height)

        return {
            x: left,
            y: top,
            width: right - left,
            height: bottom - top
        }
    }

    public toString() {
        return("{x: " + this.x + ", y: " + this.y + ", width: " + this.width + ", height: " + this.height + "}");
    }
}
