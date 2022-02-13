import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  get options() {
    return { printDelay: 500 };
  }
}
