// @flow
import type {State as S} from 'app/store/flow';
import type {ApiUserType} from 'app/api';

import store from 'app/store';
import {u214572759} from 'app/mock/user';

export async function signin(): Promise<ApiUserType> {
  const state: S = store.getState();
  store.setState({
    ...state,
    pageConnectLoading: true
  }, 'SIGNIN_START');

  setTimeout((): void => {
    store.setState({
      ...state,
      page: 'main',
      user: u214572759
    }, 'SIGNIN_FINISH');
  }, 3000);

  return u214572759;
}
