/* @flow */
import React, {Element} from 'react';
import Left from 'app/view/main/left';
import Stream from 'app/view/main/stream';
import style from 'app/view/main/index.less';

export default (): Element<*> => (
  <div className={style.main}>
    <div className="body">
      <Left />
      <div className="right">
        <Stream />
      </div>
    </div>
    <div className="footer">
      footer
    </div>
  </div>
);
