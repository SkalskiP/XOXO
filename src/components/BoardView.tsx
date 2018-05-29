import * as React from 'react';
import { ImageButton } from './ImageButton';
import TopArrow from './../assets/arrow_top.png';
import BottomArrow from './../assets/arrow_bottom.png';
import LeftArrow from './../assets/arrow_left.png';
import RightArrow from './../assets/arrow_right.png';
import { GameBoard } from './GameBoard';
import { Point } from '../utils/geometry/Point';
import { ApplicationState } from '../store/index';
import { Dispatch, connect } from 'react-redux';
import { updateBoardAnchorPoint } from '../store/game/actions';
import { AppSettings } from '../settings/AppSettings';
import { IPoint } from '../interfaces/IPoint';

interface Props {
    boardAnchorPoint:Point;
    onNewBoardAnchor: (newBoardAnchorPoint:Point) => any;
}

export class BoardViewComponent extends React.Component<Props, {}> {

    protected fullBoardSizeCells = AppSettings.boardSizeCells;

    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        window.addEventListener('keydown', this.keyboardNavigation);
    }

    public componentWillUnmount() {
        window.removeEventListener('keydown', this.keyboardNavigation);
    }

    protected updateBoardAnchor(vector:IPoint) {
        let newAnchorPoint = new Point(
            this.props.boardAnchorPoint.x + vector.x,
            this.props.boardAnchorPoint.y + vector.y
        );
        this.props.onNewBoardAnchor(newAnchorPoint);
    }

    protected moveBoardUp = () => {
        this.updateBoardAnchor({x: 0, y: 1})
    }

    protected moveBoardDown = () => {
        this.updateBoardAnchor({x: 0, y: -1})
    }

    protected moveBoardLeft = () => {
        this.updateBoardAnchor({x: 1, y: 0})
    }

    protected moveBoardRight = () => {
        this.updateBoardAnchor({x: -1, y: 0})
    }

    protected keyboardNavigation = (event):void => {
        switch (event.keyCode) {
            case 37:
                this.updateBoardAnchor({x: 1, y: 0});
                break;
            case 38:
                this.updateBoardAnchor({x: 0, y: 1});
                break;
            case 39:
                this.updateBoardAnchor({x: -1, y: 0});
                break;
            case 40:
                this.updateBoardAnchor({x: 0, y: -1});
                break;
        }
    }

    public render() {
        return (
            <div className={"BoardView"}>
                <ImageButton 
                    image={TopArrow}
                    imageAlt={"Top Arrow"}
                    size={{width: 60, height: 60}}
                    onClick={this.moveBoardUp}
                />
                <div className={"MiddleRow"}>
                    <ImageButton 
                        image={LeftArrow}
                        imageAlt={"Left Arrow"}
                        size={{width: 60, height: 60}}
                        onClick={this.moveBoardLeft}
                    />
                    <GameBoard/>
                    <ImageButton 
                        image={RightArrow}
                        imageAlt={"Right Arrow"}
                        size={{width: 60, height: 60}}
                        onClick={this.moveBoardRight}
                    />
                </div>
                <ImageButton 
                    image={BottomArrow}
                    imageAlt={"Bottom Arrow"}
                    size={{width: 60, height: 60}}
                    onClick={this.moveBoardDown}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    boardAnchorPoint: state.game.boardAnchorPoint
});

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>) => ({
    onNewBoardAnchor: (newBoardAnchorPoint:Point) => dispatch(updateBoardAnchorPoint(newBoardAnchorPoint))
});

export const BoardView = connect(mapStateToProps, mapDispatchToProps)(
    BoardViewComponent
);
