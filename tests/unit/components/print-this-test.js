import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('print-this', 'Unit | Component | print this', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it uses the rootURL to set up print options', function(assert) {
  const rootURL = '/my-root-url/';
  const component = this.subject();

  const options = component._constructPrintOptions({ rootURL });
  
  assert.equal(options.base, rootURL);
});

test('it can use the legacy baseURL to set up print options', function(assert) {
  const baseURL = '/my-root-url/';
  const component = this.subject();

  const options = component._constructPrintOptions({ baseURL });
  
  assert.equal(options.base, baseURL);
});

test('it merges user defined options with base', function(assert) {
  const rootURL = '/my-root-url/';

  const options = {
    printDelay: 3000,
  }

  const component = this.subject({ options });

  const mergedOptions = component._constructPrintOptions({ rootURL });
  
  assert.equal(mergedOptions.base, rootURL);
  assert.equal(mergedOptions.printDelay, options.printDelay);
});

test('it will overwite base if user specified', function(assert) {
  const rootURL = '/my-root-url/';

  const options = {
    base: 'foo',
  }

  const component = this.subject({ options });

  const mergedOptions = component._constructPrintOptions({ rootURL });
  
  assert.equal(mergedOptions.base, options.base);
});
