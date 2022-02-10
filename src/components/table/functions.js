import {range} from '@core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function matrix($startCell, $endCell) {
  const start = $startCell.id(true);
  const end = $endCell.id(true);
  const cols = range(start.col, end.col);
  const rows = range(start.row, end.row);
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key, {row, col}) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;

    case 'Tab':
    case 'ArrowRight':
      col++;
      break;

    case 'ArrowLeft':
      col--;
      break;

    case 'ArrowUp':
      row--;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
