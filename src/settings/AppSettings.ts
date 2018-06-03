import { Size } from "../utils/geometry/Size";

export class AppSettings {

    // GENERAL APP SETTINGS
    public static gitHubUrl:string = 'https://github.com/SkalskiP';
    public static twitterUrl:string = 'https://twitter.com/PiotrSkalski92';

    // BOARD
    public static boardCellSizePx:Size = new Size(40, 40);
    public static boardSizeCells:Size = new Size(20, 20); // (width, height)

    // VIEW
    public static activePlayerHex:string = "#14bdac";
    public static inactivePalyerHex:string = "#dcdcdc";
}