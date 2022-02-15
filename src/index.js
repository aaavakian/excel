import {createStore} from '@core/createStore';
import {debounce, storage} from '@core/utils';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {INITIAL_STATE} from '@/store/initialState';
import {rootReducer} from '@/store/rootReducer';
import './scss/index.scss';

const store = createStore(rootReducer, INITIAL_STATE);

const stateListener = debounce(state => {
  console.log('App state:', state);
  storage('excel-state', state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
});

excel.render();
