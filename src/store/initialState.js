import {DEFAULT_TITLE, DEFAULT_STYLES} from '@/constants';

const DEFAULT_STATE = {
  title: DEFAULT_TITLE,
  rowState: {},
  colState: {},
  // '0:1' => 'text'
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: DEFAULT_STYLES,
  openedDate: new Date().toJSON()
};

const normalize = state => ({
  ...state,
  currentText: '',
  currentStyles: DEFAULT_STYLES
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : DEFAULT_STATE;
}

