// @flow
import type {ApiUserType} from 'app/api/index';

export type State = {
  page: 'connect' | 'main',
  pageConnectLoading: boolean,
  user: ?ApiUserType
};

export const getInitial = (loading: boolean = false): State => ({
  page: 'connect',
  pageConnectLoading: loading,
  user: null
});
