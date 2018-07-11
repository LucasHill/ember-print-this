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

    const environment = Ember.getOwner(this).resolveRegistration('config:environment');
    const mergedOptions = this._constructPrintOptions(environment);

    this._jQuery(printSelector).printThis(mergedOptions);
  },

  _constructPrintOptions(environment) {
    const base = environment.rootURL || environment.baseURL;
    const options = base === '/' ? { } : { base };

    const userOptions = this.get('options') || {};
    
    return Ember.merge(options, userOptions)
  },

  _jQuery: function(toSelect) {
    return this.$(toSelect);
  }
});
