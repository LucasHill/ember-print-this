/* eslint-env node */
module.exports = {
  description: '',
  
  normalizeEntityName: function() {
    //noop
  },
  
  afterInstall: function() {
    return this.addBowerPackageToProject('printThis', '1.9.0');
  }
};
