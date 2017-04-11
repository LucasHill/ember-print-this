import Ember from 'ember';
import layout from '../templates/components/print-this';

export default Ember.Component.extend({
  layout,
  printClass: 'content__printThis',
  autoPrint: false,
  
  didInsertElement() {
    if(this.get('autoPrint')) {
      this.get('_jQuery')(`.${this.get('printClass')}`).printThis();
    }
  },

  _jQuery: Ember.$
});
