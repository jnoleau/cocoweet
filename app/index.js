import 'babel-polyfill';

import React, {Component} from 'react';
import { render } from 'react-dom';
import Test from 'cocoweet/components/test';

class App extends Component {
  render() {
    return <div><Test /></div>;
  }
}

render(
  <App />,
  document.getElementById('root')
);
