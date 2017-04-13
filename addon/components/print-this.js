import Ember from 'ember';
import layout from '../templates/components/print-this';

export default Ember.Component.extend({
  layout,
  defaultPrintClass: 'content__printThis',
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
    const printSelector = this.get('printSelector') || `.${this.get('defaultPrintClass')}`;
    const options = this.get('options') || {};
    this.get('_jQuery')(printSelector).printThis(options);
  },

  _jQuery: Ember.$
});
