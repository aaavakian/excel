import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/template';
import {resizeHandler} from '@/components/table/resize';
import {shouldResize} from '@/components/table/functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      // Добавляем одно событие на корневой элемент, чтобы для каждой ячейки
      // не делать этого. Это оптимизация, делегирование
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable(50);
  }

  onMousedown(event) {
    // Получение атрибутов data-...
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}
