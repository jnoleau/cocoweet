// @flow
/* eslint-disable no-underscore-dangle */
import {createStore as reduxCreateStore} from 'redux';

export type Action = string | {type: string};

export type Store<S: Object> = {
  getState: () => S,
  setState: (state: S, action: ?Action) => void,
  alterState: (statePart: $Shape<S>, action: ?Action) => void,
  reduxStore: any
}

export function createStore<S: Object>(initialState: S, reduxEnhancer: any): Store<S> {
  type _reduxAction = {type: string, _newState: S};

  const getReduxAction = (state: S, action: ?Action): _reduxAction => {
    if (typeof action === 'string') return {type: action, _newState: state};
    else if (action) return {...action, _newState: state};

    return {type: 'SET_STATE', _newState: state};
  };

  const reduxStore = reduxCreateStore(
    (state: S, action: _reduxAction): S => (action._newState ? action._newState : state),
    initialState,
    reduxEnhancer
  );

  const getState = reduxStore.getState;

  const setState = (state: S, action: ?Action): void => {
    reduxStore.dispatch(getReduxAction(state, action));
  };

  const alterState = (statePart: $Shape<S>, action: ?Action): void => {
    setState({
      ...getState(),
      ...statePart
    }, action);
  };

  return {
    reduxStore,
    getState,
    setState,
    alterState
  };
}
