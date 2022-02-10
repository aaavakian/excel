import TableSelection from '@/components/table/TableSelection';
import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/template';
import {resizeHandler} from '@/components/table/resize';
import {
  shouldResize, isCell, matrix, nextSelector
} from '@/components/table/functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      // Добавляем одно событие на корневой элемент, чтобы для каждой ячейки
      // не делать этого. Это оптимизация, делегирование
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  toHTML() {
    return createTable(50);
  }

  init() {
    super.init();

    this.$on('formula:input', newText => this.selection.current.text(newText));
    this.$on('formula:done', () => this.selection.current.focus());

    // Выбор ячейки по умолчанию
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  onMousedown(event) {
    // Получение атрибутов data-...
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const ids = matrix($target, this.selection.current);
        const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Tab', 'Enter', 'ArrowLeft',
      'ArrowRight', 'ArrowDown', 'ArrowUp'
    ];

    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      if ($next.$el) {
        this.selectCell($next);
      }
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}
