import * as React from 'react';
import { ISize } from '../interfaces/ISize';

interface Props {
    size:ISize,
    image:string,
    imageAlt:string,
    onClick?:any
}

export const ImageButton = (props:Props) => {
    let imagePadding:number = 20;

    let buttonStyle:React.CSSProperties = {
        width: props.size.width,
        height: props.size.height
    }

    let imageStyle:React.CSSProperties = {
        maxWidth: props.size.width - imagePadding,
        maxHeight: props.size.height - imagePadding
    }
    
    return(
        <div className="ImageButton" style={buttonStyle} onClick={props.onClick ? props.onClick : null}>
            <img alt={props.imageAlt} src={props.image} style={imageStyle}/>
        </div>
    );
}