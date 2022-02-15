import {parse} from '@core/parse';
import {toInlineStyles} from '@core/utils';
import {DEFAULT_STYLES} from '@/constants';

const CODES = {
  A: 65,
  Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(colState, index) {
  return (colState[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(rowState, index) {
  return (rowState[index] || DEFAULT_HEIGHT) + 'px';
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function toColumn({col, index, width}) {
  return `
    <div
      class="column"
      data-type="resizable"
      data-col="${index}"
      style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toCell(row, state) {
  return (_, col) => {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...DEFAULT_STYLES,
      ...state.stylesState[id]
    });

    return `
      <div
        class="cell"
        contenteditable
        data-id="${id}"
        data-type="cell"
        data-col="${col}"
        data-value="${data || ''}"
        style="${styles}; width: ${width};"
      >${parse(data) || ''}</div>
    `;
  };
}

function createRow(index, content, rowState) {
  const resize = index
      ? '<div class="row-resize" data-resize="row"></div>'
      : '';
  const height = getHeight(rowState, index);
  return `
    <div
      class="row"
      data-type="resizable"
      data-row="${index}"
      style="height: ${height}"
    >
      <div class="row-info">
        ${index || ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function withWidthFrom(colState) {
  return (col, index) => {
    return {col, index, width: getWidth(colState, index)};
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill()
      .map(toChar)
      .map(withWidthFrom(state.colState))
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols, {}));

  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const cells = new Array(colsCount)
        .fill()
        .map(toCell(rowIndex, state))
        .join('');

    rows.push(createRow(rowIndex + 1, cells, state.rowState));
  }

  return rows.join('');
}
