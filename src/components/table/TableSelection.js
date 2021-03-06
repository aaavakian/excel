export default class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  get selectedIds() {
    return this.group.map($el => $el.id());
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className));
    this.group = [];
  }

  select($el) {
    this.clear();
    this.group.push($el);
    $el.addClass(TableSelection.className).focus();
    this.current = $el;
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    $group.forEach($el => $el.addClass(TableSelection.className));
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style));
  }
}
