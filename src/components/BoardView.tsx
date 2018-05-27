import * as React from 'react';
import { ImageButton } from './ImageButton';
import TopArrow from './../assets/arrow_top.png';
import BottomArrow from './../assets/arrow_bottom.png';
import LeftArrow from './../assets/arrow_left.png';
import RightArrow from './../assets/arrow_right.png';
import { GameBoard } from './GameBoard';

export class BoardView extends React.Component {

    public render() {
        return (
            <div className={"BoardView"}>
                <ImageButton 
                    image={TopArrow}
                    imageAlt={"Top Arrow"}
                    size={{width: 60, height: 60}}
                />
                <div className={"MiddleRow"}>
                    <ImageButton 
                        image={LeftArrow}
                        imageAlt={"Left Arrow"}
                        size={{width: 60, height: 60}}
                    />
                    <GameBoard/>
                    <ImageButton 
                        image={RightArrow}
                        imageAlt={"Right Arrow"}
                        size={{width: 60, height: 60}}
                    />
                </div>
                <ImageButton 
                    image={BottomArrow}
                    imageAlt={"Bottom Arrow"}
                    size={{width: 60, height: 60}}
                />
            </div>
        );
    }
}
