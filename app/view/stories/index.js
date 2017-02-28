// @flow
import type {RE} from 'app/flow/misc';

import React from 'react';
import {storiesOf} from '@kadira/storybook';
import tweetExtendedBig from 'app/mock/samples/initial/extended_big';

import style from 'app/view/main/stream.less';
import StreamTweet from 'app/view/main/stream.tweet';

storiesOf('Tweet', module)
  .addDecorator((story: any): RE => (
    <div className="body">
      <div className="right">
        <div className={style.stream}>
          <ul><li>{story()}</li></ul>
        </div>
      </div>
    </div>
  ))
  .add('extended > 140', (): RE => <StreamTweet tweet={tweetExtendedBig} />)
;
