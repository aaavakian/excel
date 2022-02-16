import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);

    this.name = options.name || '';
    this.store = options.store;
    this.subscribe = options.subscribe || [];
    this.emitter = options.emitter;
    this.unsubscribers = [];

    this.prepare();
  }

  // Configure component before init
  prepare() {}

  // Returns component template
  toHTML() {
    return '';
  }

  // Init component
  // Add DOM listeners
  init() {
    this.initDOMListeners();
  }

  // Notify listeners about event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Subscribe to event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // Recieve changes from state properties that were subscribed on
  $storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // Delete component
  // Clear listeners
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
