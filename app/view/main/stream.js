// @flow
import type {RE} from 'app/flow/misc';
import type {TweetStreamType, State} from 'app/store/state';

import React from 'react';
import {connect} from 'react-redux';
import style from 'app/view/main/stream.less';
import StreamList from 'app/view/main/stream.list';


type StreamPropsType = {stream: TweetStreamType};
const Stream = ({stream}: StreamPropsType): RE => (
  <div className={style.stream}>
    <header className={style.head}>TIMELINE</header>
    <StreamList tweets={stream.tweets} />
  </div>
);

const Timeline = connect((state: State): StreamPropsType => ({stream: state.timeline}))(Stream);
export default Timeline;
