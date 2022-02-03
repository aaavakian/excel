const CODES = {
  'A': 65,
  'Z': 90
};

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function toColumn(col) {
  return `<div class="column">${col}</div>`;
}

function toCell(content = '') {
  return `<div class="cell" contenteditable>${content}</div>`;
}

function createRow(number, content = '') {
  return `
    <div class="row">
      <div class="row-info">${number || ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill()
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols));

  for (let index = 0; index < rowsCount; index++) {
    const cells = new Array(colsCount)
        .fill()
        .map(toCell)
        .join('');

    rows.push(createRow(index + 1, cells));
  }

  return rows.join('');
}
