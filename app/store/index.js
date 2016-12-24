// @flow
import type {State} from 'app/store/state';
import type {Store as StoreLib} from 'app/store/lib';

import deepmerge from 'deepmerge';
import {applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import {createStore} from 'app/store/lib';
import {getInitial} from 'app/store/state';
import storageMiddleware, {restore} from 'app/store/middleware.tostorage';

export type Store = StoreLib<State>;

const savedState = restore('cocoweet');
const initialState: State = getInitial(savedState !== null && savedState.user !== null);

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
  savedState ? deepmerge(initialState, savedState) : initialState,
  composeEnhancers(applyMiddleware(logger, storage))
);

export default store;
