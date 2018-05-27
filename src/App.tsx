import * as React from 'react';
import { NavigationBar } from './components/NavigationBar';
import { BoardView } from './components/BoardView';

export class App extends React.Component {
  public render() {
    return (
      <div className={"App"}>
        <NavigationBar/>
        <BoardView/>
      </div>
    );
  }
}