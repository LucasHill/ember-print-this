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
    }
  },

  didInsertElement() {
    if(this.get('autoPrint')) {
      this._print();
    }
  },
  
  _print() {
    const printSelector = this.get('printSelector') || '';

    this.get('printThis').print(printSelector, this.get('options') || {}, this.$.bind(this));
  },
});
