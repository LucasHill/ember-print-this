import { merge } from '@ember/polyfills';
import { getOwner } from '@ember/application';
import $ from 'jquery';
import Service from '@ember/service';

export default Service.extend({
  print(printSelector, options, jQuery = $) {
    const environment = getOwner(this).resolveRegistration('config:environment');
    const mergedOptions = this._constructPrintOptions(environment, options);

    this._selectElement(printSelector, jQuery).printThis(mergedOptions);
  },

  _constructPrintOptions(environment = { rootURL: '/' }, userOptions = {}) {
    const base = environment.rootURL || environment.baseURL;
    const options = base === '/' ? { } : { base };
    
    return merge(options, userOptions);
  },

  _selectElement: function(toSelect, jQuery) {
    return jQuery(toSelect);
  }
});
