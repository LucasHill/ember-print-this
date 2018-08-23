import Ember from 'ember';

export default Ember.Service.extend({
  print(printSelector, options, jQuery = Ember.$) {
    const environment = Ember.getOwner(this).resolveRegistration('config:environment');
    const mergedOptions = this._constructPrintOptions(environment, options);

    this._selectElement(printSelector, jQuery).printThis(mergedOptions);
  },

  _constructPrintOptions(environment = { rootURL: '/' }, userOptions = {}) {
    const base = environment.rootURL || environment.baseURL;
    const options = base === '/' ? { } : { base };
    
    return Ember.merge(options, userOptions)
  },

  _selectElement: function(toSelect, jQuery) {
    return jQuery(toSelect);
  }
});
