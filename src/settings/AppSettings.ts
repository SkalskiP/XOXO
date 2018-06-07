import { Size } from "../utils/geometry/Size";
import { Player } from "../utils/Player";

export class AppSettings {

    // GENERAL APP SETTINGS
    public static gitHubUrl:string = 'https://github.com/SkalskiP';
    public static twitterUrl:string = 'https://twitter.com/PiotrSkalski92';

    // BOARD
    public static boardCellSizePx:Size = new Size(40, 40);
    public static boardSizeCells:Size = new Size(15, 15); // (width, height)

    // MINMAX
    public static playerToMaximize:Player = Player.O;
    public static radiousOfSimulatedField:number = 1;
    public static numberOfSimulatedMoves:number = 3;

    // VIEW
    public static activePlayerHex:string = "#14bdac";
    public static inactivePalyerHex:string = "#dcdcdc";
    public static possibleMoveRGBA:string = "rgba(20, 189, 172, 0.5)"
}