import * as React from 'react';
import { ISize } from '../interfaces/ISize';
import { AppSettings } from '../settings/AppSettings';

interface Props {
    isPlayerActive:boolean,
    playerName:string,
    style?:React.CSSProperties
}

export const PlayerBox = (props:Props) => {
    
    let indicatorStyle:React.CSSProperties = {
        backgroundColor: props.isPlayerActive ? AppSettings.activePlayerHex : AppSettings.inactivePalyerHex
    }

    return(
        <div className="PlayerBox" style={props.style}>
            <div className="NameBox">
                {props.playerName}
            </div>
            <div className="ActivityIndicator" style={indicatorStyle}/>
        </div>
    );
}