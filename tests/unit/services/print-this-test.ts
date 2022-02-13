import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import PrintThis from 'ember-print-this/services/print-this';

module('Unit | Service | print this', function (hooks) {
  setupTest(hooks);

  test('#constructPrintOptions it uses the rootURL to set up print options', function (assert) {
    const rootURL = '/my-root-url/';
    const service = this.owner.lookup('service:print-this') as PrintThis;

    const options = service.constructPrintOptions({ rootURL });

    assert.strictEqual(options.base, rootURL);
  });

  test('#constructPrintOptions it can use the legacy baseURL to set up print options', function (assert) {
    const baseURL = '/my-root-url/';
    const service = this.owner.lookup('service:print-this') as PrintThis;

    const options = service.constructPrintOptions({ baseURL });

    assert.strictEqual(options.base, baseURL);
  });

  test('#constructPrintOptions it merges user defined options with base', function (assert) {
    const rootURL = '/my-root-url/';

    const options = {
      printDelay: 3000,
    };

    const service = this.owner.lookup('service:print-this') as PrintThis;

    const mergedOptions = service.constructPrintOptions({ rootURL }, options);

    assert.strictEqual(mergedOptions.base, rootURL);
    assert.strictEqual(mergedOptions.printDelay, options.printDelay);
  });

  test('#constructPrintOptions it will overwrite base if user specified', function (assert) {
    const rootURL = '/my-root-url/';

    const options = {
      base: 'foo',
    };

    const service = this.owner.lookup('service:print-this') as PrintThis;

    const mergedOptions = service.constructPrintOptions({ rootURL }, options);

    assert.strictEqual(mergedOptions.base, options.base);
  });

  test('#print it throws if no parameter provided', function (assert) {
    const service = this.owner.lookup('service:print-this') as any;

    assert.throws(() => service.print());
  });

  test('#print if provided string selector it selects with jQuery and provides options to printThis', function (assert) {
    const service = this.owner.lookup('service:print-this') as any;

    const printThisSpy = sinon.spy();
    const jqueryStub = sinon.stub();
    jqueryStub.returns({
      printThis: printThisSpy,
    });

    service.print('foo', { printDelay: 1000 }, jqueryStub);
    assert.strictEqual(jqueryStub.callCount, 1);
    assert.strictEqual(jqueryStub.args[0][0], 'foo');

    assert.strictEqual(printThisSpy.callCount, 1);
    assert.deepEqual(printThisSpy.args[0][0], { printDelay: 1000 });
  });

  test('#print if provided a jQuery element it calls printThis directly with provided options', function (assert) {
    const service = this.owner.lookup('service:print-this') as any;

    const printThisSpy = sinon.spy();

    service.print({ printThis: printThisSpy }, { printDelay: 1000 });
    assert.strictEqual(printThisSpy.callCount, 1);
    assert.deepEqual(printThisSpy.args[0][0], { printDelay: 1000 });
  });
});
