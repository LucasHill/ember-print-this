import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

module('Unit | Service | print this', function(hooks) {
  setupTest(hooks);

  test('#_constructPrintOptions it uses the rootURL to set up print options', function(assert) {
    const rootURL = '/my-root-url/';
    const service = this.owner.lookup('service:print-this');

    const options = service._constructPrintOptions({ rootURL });
    
    assert.equal(options.base, rootURL);
  });

  test('#_constructPrintOptions it can use the legacy baseURL to set up print options', function(assert) {
    const baseURL = '/my-root-url/';
    const service = this.owner.lookup('service:print-this');

    const options = service._constructPrintOptions({ baseURL });
    
    assert.equal(options.base, baseURL);
  });

  test('#_constructPrintOptions it merges user defined options with base', function(assert) {
    const rootURL = '/my-root-url/';

    const options = {
      printDelay: 3000,
    }

    const service = this.owner.lookup('service:print-this');

    const mergedOptions = service._constructPrintOptions({ rootURL }, options);
    
    assert.equal(mergedOptions.base, rootURL);
    assert.equal(mergedOptions.printDelay, options.printDelay);
  });

  test('#_constructPrintOptions it will overwite base if user specified', function(assert) {
    const rootURL = '/my-root-url/';

    const options = {
      base: 'foo',
    }

    const service = this.owner.lookup('service:print-this');

    const mergedOptions = service._constructPrintOptions({ rootURL }, options);
    
    assert.equal(mergedOptions.base, options.base);
  });

  test('#_selectElement it calls jquery fn with selector', function(assert) {
    const service = this.owner.lookup('service:print-this');
    const spy = sinon.spy();

    service._selectElement('foo', spy);
    assert.equal(spy.callCount, 1);
    assert.equal(spy.args[0][0], 'foo');
  });

  test('#print it calls printThis with overriden jquery object', function(assert) {
    const service = this.owner.lookup('service:print-this');
    const selector = 'foo';
    const printThisSpy = sinon.spy();
    const options = { blah: 'bar' };

    const fauxJquery = {
      $: () => {}
    }

    const jqueryStub = sinon.stub(fauxJquery, '$').callsFake(function() {
      return { printThis: printThisSpy }
    });

    service.print(selector, options, fauxJquery.$);

    assert.equal(jqueryStub.callCount, 1);
    assert.equal(jqueryStub.args[0][0], selector);
    
    assert.equal(printThisSpy.callCount, 1);
    assert.deepEqual(printThisSpy.args[0][0], options);
  });
});
