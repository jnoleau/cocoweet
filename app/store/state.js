// @flow
import type {ApiUserType, ApiCredentialsType, ApiTweetType} from 'app/api/index';
import Const from 'app/const';

export type TweetStreamType = {
  tweets: ApiTweetType[],
  nbDisplayed: number
};

export type State = {
  initialized: boolean,
  page: 'connect' | 'main',
  pageConnectLoading: boolean,
  user: ?ApiUserType,
  credentials: ?ApiCredentialsType,
  timeline: TweetStreamType
};

export const getInitial = (): State => ({
  initialized: false,
  page: 'connect',
  pageConnectLoading: true,
  user: null,
  credentials: null,
  timeline: {
    tweets: [],
    nbDisplayed: Const.STREAM_MIN_TWEETS
  }
});
