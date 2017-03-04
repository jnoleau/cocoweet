// @flow
import type {RE} from 'app/flow/misc';

import React from 'react';
import {storiesOf} from '@kadira/storybook';
import tweetExtendedBig from 'app/mock/samples/extended/big';
import tweetExtendedHidden from 'app/mock/samples/extended/hidden';
import tweetExtendedSimple from 'app/mock/samples/extended/simple';
import compatSimple from 'app/mock/samples/compat/simple';

import style from 'app/view/main/stream.less';
import StreamTweet from 'app/view/main/stream.tweet';

storiesOf('Tweet Extended (REST)', module)
  .addDecorator((story: any): RE => (
    <div className="body">
      <div className="right">
        <div className={style.stream}>
          <ul><li>{story()}</li></ul>
        </div>
      </div>
    </div>
  ))
  .add('< 140', (): RE => <StreamTweet tweet={tweetExtendedSimple} />)
  .add('< 140, hidden', (): RE =>
    <StreamTweet tweet={tweetExtendedHidden} />)
  .add('> 140, hidden', (): RE => <StreamTweet tweet={tweetExtendedBig} />)
;

storiesOf('Tweet Compat (STREAM)', module)
  .addDecorator((story: any): RE => (
    <div className="body">
      <div className="right">
        <div className={style.stream}>
          <ul><li>{story()}</li></ul>
        </div>
      </div>
    </div>
  ))
  .add('< 140 simple', (): RE => <StreamTweet tweet={compatSimple} />)
;
