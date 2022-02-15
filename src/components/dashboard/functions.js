import {storage} from '@core/utils';

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

function toHTML(key) {
  const state = storage(key);

  return `
    <li class="db__record">
      <a href="#excel/${key.split(':')[1]}">${state.title}</a>
      <strong>
        <span>${new Date(state.openedDate).toLocaleDateString()}</span>
        <span>${new Date(state.openedDate).toLocaleTimeString()}</span>
      </strong>
    </li>
  `;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`;
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
    ${keys.map(toHTML).join('')}
    </ul>
  `;
}
