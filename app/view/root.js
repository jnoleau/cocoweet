/* @flow */
import React, {Element} from 'react';
import Connect from 'app/view/connect';
import Main from 'app/view/main/index';
import './root.less';


export default (): Element<*> => (
  <div>
    <Connect loading={false} onConnect={(): void => console.log('ioi')} />
    {/* <Main /> */}
  </div>
);
