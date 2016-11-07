/* @flow */
import 'babel-polyfill';

import React, {Component, Element} from 'react';
import {render} from 'react-dom';
import Test from 'app/components/test';

class App extends Component { // eslint-disable-line react/prefer-stateless-function
  render(): Element<*> {
    return <div><Test /></div>;
  }
}

render(
  <App />,
  document.getElementById('root')
);
