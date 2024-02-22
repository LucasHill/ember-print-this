import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from '../templates/components/print-this';

export default Component.extend({
  layout,
  printThis: service(),
  defaultPrintClass: 'content__printThis',
  classNameBindings: ['defaultPrintClass'],
  printSelector: null,
  autoPrint: false,
  options: null,
  actions: {
    doPrint() {
      this._print();
    },
  },

  didInsertElement() {
    this._super(...arguments);
    if (this.autoPrint) {
      this._print();
    }
  },

  _print() {
    const printSelector = this.printSelector || '';

    this.printThis.print(printSelector, this.options || {});
  },
});
