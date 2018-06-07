import * as React from 'react';
import { NavigationBar } from './components/NavigationBar';
import { GameView } from './components/GameView';

export class App extends React.Component {
  public render() {
    return (
      <div className={"App"}>
        <NavigationBar/>
        <GameView/>
      </div>
    );
  }
}