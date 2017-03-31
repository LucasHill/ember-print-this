/* eslint-env node */
module.exports = {
  description: '',

  afterInstall: function(options) {
    return this.addBowerPackageToProject('printThis', '1.9.0');
  }
};
