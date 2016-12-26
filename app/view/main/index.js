// @flow
import type {ApiUserType} from 'app/api';

import React, {Element} from 'react';
import Left from 'app/view/main/left';
import Stream from 'app/view/main/stream';
import style from 'app/view/main/index.less';

export default ({me}: {me: ApiUserType}): Element<*> => (
  <div className={style.main}>
    <div className="body">
      <Left me={me} />
      <div className="right">
        <Stream />
      </div>
    </div>
    <div className="footer">
      soon something here !
    </div>
  </div>
);
