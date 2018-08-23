import Ember from 'ember';
import layout from '../templates/components/print-this';

export default Ember.Component.extend({
  layout,
  printThis: Ember.inject.service(),
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
