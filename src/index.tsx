import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { App } from './App';
import { ApplicationState } from './store/index';
import configureStore from './configureStore';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store: Store<ApplicationState> = configureStore();

const startingPoint = (
  <Provider store={store}>
      <App/>
  </Provider>
);

ReactDOM.render(
  startingPoint,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
