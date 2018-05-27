import { ISize } from '../../interfaces/ISize';

export class Size implements ISize {

    public width:number;
    public height:number;

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
