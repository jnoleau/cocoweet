// @flow
import type {ApiUserType} from 'app/api/index';
import type {Store as S} from 'app/store/lib';

export type State = {
  page: 'connect' | 'main',
  pageConnectLoading: boolean,
  user: ?ApiUserType
};

export type Store = S<State>;

export type Actuator =
  (getState: () => State, setState: (newState: State, modifierName: ?string) => void) => Function;
