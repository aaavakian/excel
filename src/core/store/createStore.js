import {clone} from '@core/utils';

export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer(clone(initialState), {type: '__INIT__'});
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter(l => l !== fn);
        }
      };
    },
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach(listener => listener(state));
    },
    getState() {
      // Create new object so mutations are impossible
      return clone(state);
    }
  };
}
