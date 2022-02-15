import {Page} from '@core/Page';
import {createStore} from '@core/createStore';
import {debounce, storage} from '@core/utils';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {normalizeInitialState} from '@/store/initialState';
import {rootReducer} from '@/store/rootReducer';

function storageName(param) {
  return `excel:${param}`;
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params || Date.now().toString();
    const state = storage(storageName(params));
    const store = createStore(rootReducer, normalizeInitialState(state));

    const stateListener = debounce(state => {
      if (process.env.NODE_ENV === 'development') {
        console.log('App state:', state);
      }
      storage(storageName(params), state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
