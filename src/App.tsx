import * as React from 'react';
import { NavigationBar } from './components/NavigationBar';
import { GameBoard } from './components/GameBoard';

export class App extends React.Component {
  public render() {
    return (
      <div className={"App"}>
        <NavigationBar/>
        <GameBoard/>
      </div>
    );
  }
}