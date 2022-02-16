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
      // Чтобы полностью избежать мутирования (новый объект)
      return clone(state);
    }
  };
}
