/* @flow */
import 'babel-polyfill';

import type {State} from 'app/store/flow';

import React, {Component, Element} from 'react';
import {Provider, connect} from 'react-redux';
import {render} from 'react-dom';
import Root from 'app/view/root';
import store from 'app/store';

// just for hot reloading purpose bug on React if only stateless
class App extends Component { // eslint-disable-line react/prefer-stateless-function
  render(): Element<*> {
    return <Root state={{...this.props}} />;
  }
}

const AppConnected = connect((state: State): State => state)(App);
window.store = store;

render(
  <Provider store={store.reduxStore}>
    <AppConnected />
  </Provider>,
  document.getElementById('root')
);
