/* @flow */
import 'babel-polyfill';

import React, {Component, Element} from 'react';
import {render} from 'react-dom';
import Root from 'app/view/root';

class App extends Component { // eslint-disable-line react/prefer-stateless-function
  render(): Element<*> {
    return <Root />;
  }
}

render(
  <App />,
  document.getElementById('root')
);
