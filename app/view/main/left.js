/* @flow */
import type {ApiUserType} from 'app/api/index';
import {u428333} from 'app/mock/user';

import React, {Element} from 'react';
import style from 'app/view/main/left.less';

const User = (props: ApiUserType): Element<*> => (
  <div className={style.user}>
    <img alt="avatar" src={props.profile_image_url_https} />
    <p>
      {props.name} <br />
      @{props.screen_name}
    </p>
  </div>
);

export default (): Element<*> => (
  <div className={style.left}>
    <User {...u428333} />
  </div>
);
