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

function sortByDate(a, b) {
  const dateA = new Date(storage(a).openedDate);
  const dateB = new Date(storage(b).openedDate);
  return dateB.getTime() - dateA.getTime();
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
    return `<p>You haven't created any tables yet</p>`;
  }

  return `
    <div class="db__list-header">
      <span>Name</span>
      <span>Last opened</span>
    </div>

    <ul class="db__list">
    ${keys.sort(sortByDate).map(toHTML).join('')}
    </ul>
  `;
}
