// @flow
import type {Store, Actuator, State as S} from 'app/store/flow';
import type {ApiUserType} from 'app/api';

import {createStore} from 'app/store/lib';
import * as actions from 'app/store/action';
import {applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';

const logger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle, max-len
const store: Store = createStore({
  page: 'connect',
  pageConnectLoading: false,
  user: null,
  number: 2
}, composeEnhancers(applyMiddleware(logger)));

export function getActuatorI(actuator: Actuator, reduxAction: {type: string}): Function {
  const setState = (state: S, modifierName: ?string): void => {
    const actionToDispatch = modifierName ?
      {...reduxAction, type: `${reduxAction.type}_${modifierName}`} : reduxAction;
    store.setState(state, actionToDispatch);
  };
  return actuator(store.getState, setState);
}

export const signin: () => Promise<ApiUserType> = getActuatorI(actions.signin, {type: 'SIGNIN'});

export default store;
