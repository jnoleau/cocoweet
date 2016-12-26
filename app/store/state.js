// @flow
import type {ApiUserType, ApiCredentialsType} from 'app/api/index';

export type State = {
  initialized: boolean,
  page: 'connect' | 'main',
  pageConnectLoading: boolean,
  user: ?ApiUserType,
  credentials: ?ApiCredentialsType
};

export const getInitial = (): State => ({
  initialized: false,
  page: 'connect',
  pageConnectLoading: true,
  user: null,
  credentials: null
});
