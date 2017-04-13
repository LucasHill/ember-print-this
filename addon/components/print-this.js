import Ember from 'ember';
import layout from '../templates/components/print-this';

export default Ember.Component.extend({
  layout,
  defaultPrintClass: 'content__printThis',
  printClass: null, //rename to print selector!
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
    const printClass = this.get('printClass') || this.get('defaultPrintClass');
    const options = this.get('options') || {};
    this.get('_jQuery')(`.${printClass}`).printThis(options);
  },
  
  _jQuery: Ember.$
});
