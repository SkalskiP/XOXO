import { ISize } from '../interfaces/ISize';
import { IPoint } from '../interfaces/IPoint';
import { UnitUtil } from './UnitUtil';
import { Rect } from './geometry/Rect';

export class CanvasUtil {

    public static applySizeToCanvas(canvas:HTMLCanvasElement, size:ISize):void {
        canvas.width = size.width;
        canvas.height = size.height;
    }

    public static clearCanvas(canvas:HTMLCanvasElement): void {
        let ctx:CanvasRenderingContext2D = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    public static drawLine(canvas:HTMLCanvasElement, startPoint:IPoint, endPoint:IPoint, 
        color:string = "#000", thickness:number = 4): void {
        
        let ctx:CanvasRenderingContext2D = canvas.getContext('2d');
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
        ctx.restore();
    }

    public static drawCircle(canvas:HTMLCanvasElement, anchorPoint:IPoint, radius:number, 
        startAngleDeg:number, endAngleDeg:number, color:string = "#000", thickness:number = 4): void {
        
        let ctx:CanvasRenderingContext2D = canvas.getContext('2d');
        let startAngleRad = UnitUtil.deg2rad(startAngleDeg);
        let endAngleRad = UnitUtil.deg2rad(endAngleDeg);
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        ctx.beginPath();
        ctx.arc(anchorPoint.x, anchorPoint.y, radius, startAngleRad, endAngleRad, false);
        ctx.stroke();
    }

    public static drawO(canvas:HTMLCanvasElement, activeCellRect:Rect, color:string = "#000", 
        padding:IPoint = {x: 15, y: 15}) {

        let center = activeCellRect.getCenterPoint();
        let thickness = activeCellRect.width / 5;
        activeCellRect.inflateByVector({x: - padding.x, y: -padding.y});
        CanvasUtil.drawCircle(canvas, center, activeCellRect.height /2, 0, 360, color, thickness);
    }

    public static drawX(canvas:HTMLCanvasElement, activeCellRect:Rect, color:string = "#000", 
        padding:IPoint = {x: 15, y: 15}) {

        let thickness = activeCellRect.width / 5;
        activeCellRect.inflateByVector({x: - padding.x, y: -padding.y});
        let topLeft:IPoint = {x: activeCellRect.x, y: activeCellRect.y};
        let bottomRight:IPoint = {x: activeCellRect.x + activeCellRect.width, y: activeCellRect.y + activeCellRect.height};
        let topRight:IPoint = {x: activeCellRect.x + activeCellRect.width, y: activeCellRect.y};
        let bottomLeft:IPoint = {x: activeCellRect.x, y: activeCellRect.y + activeCellRect.height};
        CanvasUtil.drawLine(canvas, topLeft, bottomRight, color, thickness);
        CanvasUtil.drawLine(canvas, bottomLeft, topRight, color, thickness);
    }

}