/* @flow */
import React, {Element} from 'react';
import style from './test.less';

export default (): Element<*> => (
  <div className={style.main}>
    <span className="foo">xyz</span>
    <img alt="bar" />
  </div>
);
