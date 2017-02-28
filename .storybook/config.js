import React from 'react';
import {configure, addDecorator} from '@kadira/storybook';
import 'app/view/root.less';
import style from 'app/view/main/index.less';

addDecorator((story) => (
  <div className={style.main}>
    {story()}
  </div>
));

function loadStories() {
  require('app/view/stories'); // eslint-disable-line
}

configure(loadStories, module);
