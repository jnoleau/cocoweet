// @flow
import type {ApiTweetType, ApiCredentialsType} from 'app/api';

import * as Api from 'app/api';
import store from 'app/store';
import * as Log from 'app/util/log';

export async function loadTimeline(): Promise<void> {
  try {
    const timeline = store.getState().timeline;
    const creds: ?ApiCredentialsType = store.getState().credentials;

    if (!creds) throw new Error('NOT_CREDENTIALS');

    const tweets: ApiTweetType[] = await Api.homeTimeline(creds, 200);

    store.setState({
      timeline: {
        ...timeline,
        tweets
      }
    }, 'INTERNAL_LOAD_TIMELINE_FINISH');
  } catch (e) {
    Log.warn(e);
  }
}
