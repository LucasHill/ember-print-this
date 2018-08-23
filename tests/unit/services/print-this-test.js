import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';
import Ember from 'ember';

moduleFor('service:print-this', 'Unit | Service | print this', {
});

test('#_constructPrintOptions it uses the rootURL to set up print options', function(assert) {
  const rootURL = '/my-root-url/';
  const service = this.subject();

  const options = service._constructPrintOptions({ rootURL });
  
  assert.equal(options.base, rootURL);
});

test('#_constructPrintOptions it can use the legacy baseURL to set up print options', function(assert) {
  const baseURL = '/my-root-url/';
  const service = this.subject();

  const options = service._constructPrintOptions({ baseURL });
  
  assert.equal(options.base, baseURL);
});

test('#_constructPrintOptions it merges user defined options with base', function(assert) {
  const rootURL = '/my-root-url/';

  const options = {
    printDelay: 3000,
  }

  const service = this.subject();

  const mergedOptions = service._constructPrintOptions({ rootURL }, options);
  
  assert.equal(mergedOptions.base, rootURL);
  assert.equal(mergedOptions.printDelay, options.printDelay);
});

test('#_constructPrintOptions it will overwite base if user specified', function(assert) {
  const rootURL = '/my-root-url/';

  const options = {
    base: 'foo',
  }

  const service = this.subject();

  const mergedOptions = service._constructPrintOptions({ rootURL }, options);
  
  assert.equal(mergedOptions.base, options.base);
});

test('#_selectElement it calls jquery fn with selector', function(assert) {
  const service = this.subject();
  const spy = sinon.spy();

  service._selectElement('foo', spy);
  assert.equal(spy.callCount, 1);
  assert.equal(spy.args[0][0], 'foo');
});

test('#print it calls printThis with correct default params', function(assert) {
  const service = this.subject();
  const selector = 'foo';
  const printThisSpy = sinon.spy();
  const options = { blah: 'bar' };

  const jqueryStub = sinon.stub(Ember, '$').callsFake(function() {
    return { printThis: printThisSpy }
  });

  service.print(selector, options);

  assert.equal(jqueryStub.callCount, 1);
  assert.equal(jqueryStub.args[0][0], selector);
  
  assert.equal(printThisSpy.callCount, 1);
  assert.deepEqual(printThisSpy.args[0][0], options);
  jqueryStub.restore();
});

test('#print it calls printThis with overriden jquery object', function(assert) {
  const service = this.subject();
  const selector = 'foo';
  const printThisSpy = sinon.spy();
  const options = { blah: 'bar' };

  const fauxEmber = {
    $: () => {}
  }

  const jqueryStub = sinon.stub(fauxEmber, '$').callsFake(function() {
    return { printThis: printThisSpy }
  });

  service.print(selector, options, fauxEmber.$);

  assert.equal(jqueryStub.callCount, 1);
  assert.equal(jqueryStub.args[0][0], selector);
  
  assert.equal(printThisSpy.callCount, 1);
  assert.deepEqual(printThisSpy.args[0][0], options);
});

