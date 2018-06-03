import { Size } from "../utils/geometry/Size";

export class AppSettings {

    // GENERAL APP SETTINGS
    public static gitHubUrl:string = 'https://github.com/SkalskiP';
    public static twitterUrl:string = 'https://twitter.com/PiotrSkalski92';

    // BOARD
    public static boardCellSizePx:Size = new Size(40, 40);
    public static boardSizeCells:Size = new Size(8, 8); // (width, height)
}