// @flow
import type {RE} from 'app/flow/misc';

import React from 'react';
import {storiesOf} from '@kadira/storybook';
import tweetExtendedBig from 'app/mock/samples/initial/extended_big';

import StreamTweet from 'app/view/main/stream.tweet';

storiesOf('Tweet', module)
  .add('extended > 140', (): RE => (
    <StreamTweet tweet={tweetExtendedBig} />
  ))
;
