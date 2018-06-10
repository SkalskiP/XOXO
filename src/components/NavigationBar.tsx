import * as React from 'react';
import { ApplicationState } from '../store/index';
import { Player } from '../utils/Player';
import { connect, Dispatch } from 'react-redux';
import { PlayerBox } from './PlayerBox';
import GitHubLogo from './../assets/GitHubLogo.png';
import SettingsIcon from '../assets/Settings.png';
import { ImageButton } from './ImageButton';
import { AppSettings } from '../settings/AppSettings';
import { openSettingsWindow } from '../store/game/actions';

interface Props {
  activePlayer:Player;
  playerXName:string;
  playerOName:string;
  isSettingsWindowOpened:boolean;
  onNewSettingsWindowStatus: (newSettingsWindowStatus:boolean) => any;
}

export class NavigationBarComponent extends React.Component<Props, {}> {

  protected toggleSettingWindow = () => {
    this.props.onNewSettingsWindowStatus(!this.props.isSettingsWindowOpened);
  }

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
              image={GitHubLogo}
              imageAlt={"GitHubLogo"}
              href={AppSettings.gitHubUrl}
              size={{width: 45, height: 45}}
          />
          <ImageButton
              image={SettingsIcon}
              imageAlt={"SettingsLogo"}
              onClick={this.toggleSettingWindow}
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
  activePlayer: state.game.activePlayer,
  isSettingsWindowOpened: state.game.isSettingsWindowOpened
});

const mapDispatchToProps = (dispatch: Dispatch<ApplicationState>) => ({
  onNewSettingsWindowStatus: (newSettingsWindowStatus:boolean) => dispatch(openSettingsWindow(newSettingsWindowStatus))
});

export const NavigationBar = connect(mapStateToProps, mapDispatchToProps)(
  NavigationBarComponent
);

