import {$} from '@core/dom';
import {debounce} from '@core/utils';
import {ExcelComponent} from '@core/ExcelComponent';
import {DEFAULT_TITLE} from '@/constants';
import {changeTitle} from '@/store/actions';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  prepare() {
    // Пример оптимизации для onInput
    this.onInput = debounce(this.onInput.bind(this), 300);
  }

  toHTML() {
    const title = this.store.getState().title || DEFAULT_TITLE;

    return `
      <input type="text" class="input" value="${title}" />
      <div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
