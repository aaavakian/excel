import TableSelection from '@/components/table/TableSelection';
import {$} from '@core/dom';
import {parse} from '@core/parse';
import {ExcelComponent} from '@core/ExcelComponent';
import {DEFAULT_STYLES} from '@/constants';
import {createTable} from '@/components/table/template';
import {resizeHandler} from '@/components/table/resize';
import {
  shouldResize, isCell, matrix, nextSelector
} from '@/components/table/functions';
import * as actions from '@/store/actions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      // Add one event handler for the root
      // Optimization, so we don't handle each cell event
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  toHTML() {
    return createTable(50, this.store.getState());
  }

  init() {
    super.init();

    this.$on('formula:input', value => this.updateCellText(value));
    this.$on('formula:done', () => this.selection.current.focus());

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value, ids: this.selection.selectedIds
      }));
    });

    // Select the default cell
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);
  }

  selectCell($cell) {
    if (this.selection.current) {
      // Return if the cell is the same
      if (this.selection.current.id() === $cell.id()) {
        return;
      }
      // Update previous if exists
      this.selection.current.text(parse(this.selection.current.data.value));
    }

    // Select new
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    // Update text to the data one
    $cell.text($cell.data.value);
    // Update styles
    const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES));
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('Resize error', e.message);
    }
  }

  onMousedown(event) {
    // Work with data-... attributes
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const ids = matrix($target, this.selection.current);
        const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = ['Tab', 'Enter'];
    const shiftKeys = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
    const {key} = event;

    if (keys.includes(key) || shiftKeys.includes(key) && event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      if ($next.$el) {
        this.selectCell($next);
      }
    }
  }

  updateCellText(value) {
    // Update data and text
    this.selection.current
        .attr('data-value', value)
        .text(value);
    // Update in store
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value: value
    }));
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target));
    this.updateCellText($(event.target).text());
  }
}
