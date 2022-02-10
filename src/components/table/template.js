const CODES = {
  A: 65,
  Z: 90
};

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toCell(row) {
  return (_, col) => {
    return `
      <div
        class="cell"
        contenteditable
        data-id="${row}:${col}"
        data-type="cell"
        data-col="${col}"
      ></div>
    `;
  };
}

function createRow(num, content = '') {
  const resize = num ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${num || ''}
        ${resize}
      </div>
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

  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const cells = new Array(colsCount)
        .fill()
        .map(toCell(rowIndex))
        .join('');

    rows.push(createRow(rowIndex + 1, cells));
  }

  return rows.join('');
}
