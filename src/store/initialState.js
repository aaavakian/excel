import {DEFAULT_TITLE, DEFAULT_STYLES} from '@/constants';
import {storage} from '@core/utils';

const DEFAULT_STATE = {
  title: DEFAULT_TITLE,
  rowState: {},
  colState: {},
  // '0:1' => 'text'
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: DEFAULT_STYLES
};

export const INITIAL_STATE = storage('excel-state') || DEFAULT_STATE;
