/* @flow */
import type {State} from 'app/store/flow';

import React, {Element} from 'react';
import Connect from 'app/view/connect';
import Main from 'app/view/main/index';
import {signin} from 'app/store';
import './root.less';


export default ({state}: {state: State}): Element<*> => (
  <div>
    {
      state.page === 'connect' ?
        <Connect loading={state.pageConnectLoading} onConnect={signin} />
        : <Main />
    }
  </div>
);
