import { ISize } from '../interfaces/ISize';
import { IPoint } from '../interfaces/IPoint';

export class CanvasUtil {

    public static applySizeToCanvas(canvas:HTMLCanvasElement, size:ISize):void {
        canvas.width = size.width;
        canvas.height = size.height;
    }

    public static clearCanvas(canvas:HTMLCanvasElement): void {
        let ctx:CanvasRenderingContext2D = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    public static drawLine(canvas:HTMLCanvasElement, startPoint:IPoint, endPoint:IPoint, color:string = "#000", thickness:number = 1): void {
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
}