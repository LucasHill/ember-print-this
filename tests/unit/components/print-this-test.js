import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

module('Unit | Component | print this', function(hooks) {
  setupTest(hooks);

  test('it prints when doPrint action called', function(assert) {
    const printSpy = sinon.spy();

    const component = this.owner.factoryFor('component:print-this').create({
      _print: printSpy
    });

    component.send('doPrint');
    assert.equal(printSpy.callCount, 1);
  });

  test('it calls print on element insert if auto print true', function(assert) {
    const printSpy = sinon.spy();

    const component = this.owner.factoryFor('component:print-this').create({
      autoPrint: true,
      _print: printSpy
    });

    component.didInsertElement();
    assert.equal(printSpy.callCount, 1);
  });

  test('it does not print on element insert if auto print false (default)', function(assert) {
    const printSpy = sinon.spy();

    const component = this.owner.factoryFor('component:print-this').create({
      _print: printSpy
    });

    component.didInsertElement();
    assert.equal(printSpy.callCount, 0);
  });

  test('it calls service with correct default params on print', function(assert) {
    const printThisSpy = sinon.spy();
    const component = this.owner.factoryFor('component:print-this').create({
      printThis: { print: printThisSpy }
    });

    component._print();

    assert.equal(printThisSpy.callCount, 1);
    assert.equal(printThisSpy.args[0][0], '');
    assert.deepEqual(printThisSpy.args[0][1], {});
  });

  test('it uses passed in options on print', function(assert) {
    const printThisSpy = sinon.spy();
    const options = { foo: 'bar' };

    const component = this.owner.factoryFor('component:print-this').create({
      printThis: { print: printThisSpy },
      options,
    });

    component._print();

    assert.equal(printThisSpy.callCount, 1);
    assert.equal(printThisSpy.args[0][0], '');
    assert.deepEqual(printThisSpy.args[0][1], options);
  });

  test('it uses passed in selector on print', function(assert) {
    const printThisSpy = sinon.spy();
    const printSelector = 'foo';

    const component = this.owner.factoryFor('component:print-this').create({
      printThis: { print: printThisSpy },
      printSelector,
    });

    component._print();

    assert.equal(printThisSpy.callCount, 1);
    assert.equal(printThisSpy.args[0][0], printSelector);
    assert.deepEqual(printThisSpy.args[0][1], {});
  });
});
