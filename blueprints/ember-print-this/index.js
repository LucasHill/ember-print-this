/* eslint-env node */
module.exports = {
  description: '',
  
  normalizeEntityName: function() {
    //noop
  },
  
  afterInstall: function(options) {
    return this.addBowerPackageToProject('printThis', '1.9.0');
  }
};
