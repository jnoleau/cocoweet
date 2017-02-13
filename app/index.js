/* @flow */
import type {State} from 'app/store/state';

import React, {Component, Element} from 'react';
import {Provider, connect} from 'react-redux';
import {render} from 'react-dom';
import Root from 'app/view/root';
import store from 'app/store';
import {initCredentials} from 'app/store/action/account';

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

if (!store.getState().initialized) initCredentials();
