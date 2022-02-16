import {storage} from '@core/utils';

function storageName(param) {
  return `excel:${param}`;
}

export class LocalStorageClient {
  constructor(id) {
    this.name = storageName(id);
  }

  get() {
    return new Promise(resolve => {
      const state = storage(this.name);
      setTimeout(() => resolve(state), 2000);
    });
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }
}
