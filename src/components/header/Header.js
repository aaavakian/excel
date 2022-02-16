import {$} from '@core/dom';
import {debounce} from '@core/utils';
import {ExcelComponent} from '@core/ExcelComponent';
import {ActiveRoute} from '@core/routes/ActiveRoute';
import {DEFAULT_TITLE} from '@/constants';
import {changeTitle} from '@/store/actions';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  prepare() {
    // Optimization example for input
    this.onInput = debounce(this.onInput.bind(this), 300);
  }

  toHTML() {
    const title = this.store.getState().title || DEFAULT_TITLE;

    return `
      <input type="text" class="input" value="${title}" />
      <div>
        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>
        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
      </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.data.button === 'remove') {
      const decision = confirm('Are you sure to delete this table?');
      if (decision) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}
