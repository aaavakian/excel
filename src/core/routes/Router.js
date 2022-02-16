import {$} from '@core/dom';
import {ActiveRoute} from './ActiveRoute';
import {Loader} from '@/components/Loader';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided to Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null;
    this.changePageHandler = this.changePageHandler.bind(this);
    this.loader = new Loader();

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  async changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }

    // Clear previous content and add loader
    this.$placeholder.clear().append(this.loader);

    const Page = ActiveRoute.path.includes('excel')
        ? this.routes.excel
        : this.routes.dashboard;
    this.page = new Page(ActiveRoute.param);
    const root = await this.page.getRoot();
    // Clear loader and add root
    this.$placeholder.clear().append(root);
    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
