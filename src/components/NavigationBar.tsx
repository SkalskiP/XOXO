import * as React from 'react';
import { ApplicationState } from '../store/index';
import { Player } from '../utils/Player';
import { connect } from 'react-redux';
import { PlayerBox } from './PlayerBox';
import GitHubLogo from './../assets/GitHubLogo.png';
import TwitterLogo from './../assets/TwitterLogo.png';
import { ImageButton } from './ImageButton';
import { AppSettings } from '../settings/AppSettings';

interface Props {
  activePlayer:Player;
  playerXName:string;
  playerOName:string;
}

export class NavigationBarComponent extends React.Component<Props, {}> {

  public render() {
    
    let playerBoxStyle:React.CSSProperties = {
      width: "20%",
    }
    
    return (
      <div className={"NavigationBar"}>
        <PlayerBox playerName={this.props.playerOName} isPlayerActive={this.props.activePlayer === Player.O} style={playerBoxStyle}/>
        VS
        <PlayerBox playerName={this.props.playerXName} isPlayerActive={this.props.activePlayer === Player.X} style={playerBoxStyle}/>
        <div className={"NavigationLinks"}>
          <ImageButton
              image={TwitterLogo}
              imageAlt={"TwitterLogo"}
              href={AppSettings.twitterUrl}
              size={{width: 45, height: 45}}
          />
          <ImageButton
              image={GitHubLogo}
              imageAlt={"GitHubLogo"}
              href={AppSettings.gitHubUrl}
              size={{width: 45, height: 45}}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  playerXName: state.game.playerXName,
  playerOName: state.game.playerOName,
  activePlayer: state.game.activePlayer
});

export const NavigationBar = connect(mapStateToProps)(
  NavigationBarComponent
);

