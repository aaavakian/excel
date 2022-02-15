import {Page} from '@core/Page';
import {Dashboard} from '@/components/dashboard/Dashboard';

export class DashboardPage extends Page {
  getRoot() {
    const dashboard = new Dashboard();
    return dashboard.getRoot();
  }
}
