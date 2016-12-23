// @flow
import type {State as S, Actuator} from 'app/store/flow';
import type {ApiUserType} from 'app/api';

import {u214572759} from 'app/mock/user';

export const signin: Actuator =
  (getState: () => S, setState: (s: S, localActionName: ?string) => void): Function =>
  async (): Promise<ApiUserType> => {
    const state: S = getState();
    setState({
      ...state,
      pageConnectLoading: true
    }, 'START');

    setTimeout((): void => {
      setState({
        ...state,
        page: 'main',
        user: u214572759
      }, 'FINISH');
    }, 3000);

    return u214572759;
  };
