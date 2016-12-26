/* @flow */
import type {ApiUserType} from 'app/api/index';

import React, {Element} from 'react';
import style from 'app/view/main/left.less';

const User = (props: ApiUserType): Element<*> => (
  <div className={style.user}>
    <img alt="avatar" src={props.profile_image_url_https} />
    <p className="ml-15">
      {props.name} <br />
      @{props.screen_name}
    </p>
  </div>
);

export default ({me}: {me: ApiUserType}): Element<*> => (
  <div className={style.left}>
    <User {...me} />
  </div>
);
