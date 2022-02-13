import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';
import PrintThis from 'ember-print-this/services/print-this';

module('Integration | Component | print this', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the content of the block', async function (assert) {
    await render(hbs`<PrintThis />`);

    assert.dom('print-this').hasText('');

    // Template block usage:
    await render(hbs`
      <PrintThis>
        template block text
      </PrintThis>
    `);

    assert.dom('print-this').hasText('template block text');
  });

  test('it auto prints the block template if specified', async function (assert) {
    const printService = this.owner.lookup('service:print-this') as PrintThis;
    const printStub = sinon.stub(printService, 'print');

    await render(hbs`
      <PrintThis @autoPrint={{true}}>
        <p>Some block stuff</p>
      </PrintThis>
    `);

    assert.strictEqual(printStub.callCount, 1, 'Print this spy is called once');
  });

  test('it does not auto print if not specified', async function (assert) {
    const printService = this.owner.lookup('service:print-this') as PrintThis;
    const printStub = sinon.stub(printService, 'print');

    await render(hbs`
      <PrintThis>
        <p>Some block stuff</p>
      </PrintThis>
    `);

    assert.strictEqual(printStub.callCount, 0, 'Print this spy is not called');
  });

  test('it can call print from yielded action', async function (assert) {
    const printService = this.owner.lookup('service:print-this') as PrintThis;
    const printStub = sinon.stub(printService, 'print');

    await render(hbs`
      <PrintThis as |doPrint|>
        <p>Some block stuff</p>
        <button onclick={{doPrint}}>Heyo</button>
      </PrintThis>
    `);

    await click('button');
    assert.strictEqual(printStub.callCount, 1, 'Print this spy is called once');
  });

  test('it uses the printSelector to print a specific element', async function (assert) {
    const printService = this.owner.lookup('service:print-this') as PrintThis;
    const printStub = sinon.stub(printService, 'print');

    await render(hbs`
      <PrintThis @printSelector="my-content" as |doPrint|>
        <my-content>Hey There</my-content>
        <button onclick={{doPrint}}>Heyo</button>
      </PrintThis>
    `);

    await click('button');
    assert.strictEqual(printStub.callCount, 1, 'Print this spy is called once');
    const firstArg = printStub.args[0][0];

    if (typeof firstArg === 'string') {
      throw 'Wrong type passed to print';
    }
    assert.strictEqual(firstArg.length, 1), 'It selects one element to print';
    assert.strictEqual(firstArg[0].innerHTML, 'Hey There'),
      'It provides the correct element to print';
  });

  test('it passes multiple elements that match the selector', async function (assert) {
    const printService = this.owner.lookup('service:print-this') as PrintThis;
    const printStub = sinon.stub(printService, 'print');

    await render(hbs`
      <PrintThis @printSelector="my-content" as |doPrint|>
        <my-content>Hey There</my-content>
        <my-content>Nice to see you</my-content>
        <button onclick={{doPrint}}>Heyo</button>
      </PrintThis>
    `);

    await click('button');
    assert.strictEqual(printStub.callCount, 1, 'Print this spy is called once');
    const firstArg = printStub.args[0][0];

    if (typeof firstArg === 'string') {
      throw 'Wrong type passed to print';
    }
    assert.strictEqual(firstArg.length, 2), 'It selects one element to print';
    assert.strictEqual(firstArg[0].innerHTML, 'Hey There'),
      'It provides the correct element to print';
    assert.strictEqual(firstArg[1].innerHTML, 'Nice to see you'),
      'It provides the correct element to print';
  });

  test('it passes the entire component element if no print selector provided', async function (assert) {
    const printService = this.owner.lookup('service:print-this') as PrintThis;
    const printStub = sinon.stub(printService, 'print');

    await render(hbs`
      <PrintThis class="printy" as |doPrint|>
        <my-content>Hey There</my-content>
        <button onclick={{doPrint}}>Heyo</button>
      </PrintThis>
    `);

    await click('button');
    assert.strictEqual(printStub.callCount, 1, 'Print this spy is called once');
    const firstArg = printStub.args[0][0];

    if (typeof firstArg === 'string') {
      throw 'Wrong type passed to print';
    }
    assert.strictEqual(firstArg.length, 1), 'It selects one element to print';
    assert.strictEqual(firstArg[0].className, 'printy'),
      'It provides the correct element to print';
  });

  test('it provides a default empty object as print options', async function (assert) {
    const printService = this.owner.lookup('service:print-this') as PrintThis;
    const printStub = sinon.stub(printService, 'print');

    await render(hbs`
      <PrintThis as |doPrint|>
        <my-content>Hey There</my-content>
        <button onclick={{doPrint}}>Heyo</button>
      </PrintThis>
    `);

    await click('button');
    assert.strictEqual(printStub.callCount, 1, 'Print this spy is called once');
    assert.deepEqual(printStub.args[0][1], {}),
      'Options is an empty object by default';
  });

  test('it provides a passes along options object provided', async function (assert) {
    const printService = this.owner.lookup('service:print-this') as PrintThis;
    const printStub = sinon.stub(printService, 'print');

    const options = {
      printDelay: 1000,
    };
    this.set('options', options);

    await render(hbs`
      <PrintThis @options={{this.options}} as |doPrint|>
        <my-content>Hey There</my-content>
        <button onclick={{doPrint}}>Heyo</button>
      </PrintThis>
    `);

    await click('button');
    assert.strictEqual(printStub.callCount, 1, 'Print this spy is called once');
    assert.deepEqual(printStub.args[0][1], options),
      'Options object is passes along';
  });
});
