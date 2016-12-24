// @flow
import type {Store, State} from 'app/store/flow';

import deepmerge from 'deepmerge';
import {applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import {createStore} from 'app/store/lib';
import storageMiddleware, {restore} from 'app/store/middleware.tostorage';

const initialState: State = {
  page: 'connect',
  pageConnectLoading: false,
  user: null,
  number: 2
};
const savedState = restore('cocoweet');

const logger = createLogger();
const storage = storageMiddleware({
  key: 'cocoweet',
  slicer: (state: State): Object => ({
    user: state.user
  }),
  actions: ['SIGNIN_FINISH']
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle, max-len
const store: Store = createStore(
  savedState ? deepmerge(initialState, restore('cocoweet')) : initialState,
  composeEnhancers(applyMiddleware(logger, storage))
);

export default store;
