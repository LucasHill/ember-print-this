import Ember from 'ember';
import layout from '../templates/components/print-this';

export default Ember.Component.extend({
  layout,
  defaultPrintClass: 'content__printThis',
  printClass: null,
  autoPrint: false,
  options: null, //pass in options hash for print this
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
    this.get('_jQuery')(`.${printClass}`).printThis();
  },
  _jQuery: Ember.$
});
