# Ember-Print-This


[![Build Status](https://travis-ci.org/LucasHill/ember-print-this.svg?branch=master)](https://travis-ci.org/LucasHill/ember-print-this)
[![npm version](https://badge.fury.io/js/ember-print-this.svg)](https://badge.fury.io/js/ember-print-this)
[![Ember Observer Score](http://emberobserver.com/badges/ember-print-this.svg)](http://emberobserver.com/addons/ember-print-this)

Ember component wrapper for the great [printThis](https://github.com/jasonday/printThis) jQuery plugin.

## Version 2.0
There were no API changes between the 1.0 release and 2.0.
The reason for the major version update was because I am
no longer testing against ember versions older than 3.4.

## Installation

Install `ember-print-this` into your ember-cli project via:

    ember install ember-print-this

## Usage
By default, anything placed into the block will get printed.
To print as soon as the content is rendered, you must specify
the autoPrint property as true in the component.

```hbs
{{#print-this autoPrint=true}}
  <p>My cool content</p>
{{/print-this}}
```

All [options](https://github.com/jasonday/printThis#all-options)
supported by printThis can be passed in through an options param 
to the component. 

```js
printThisOptions: {
  printDelay: 500
}
```

```hbs
{{#print-this options=printThisOptions autoPrint=true}}
  <p>My cool content</p>
{{/print-this}}
```

A custom selector can be provided so only part of the block is printed. 

```hbs
{{#print-this printSelector=".customContent" autoPrint=true}}
  <div class="customContent">
    <p>Will get printed</p>
  </div>

  <p>Won't be printed</p>
{{/print-this}}
```

Printing can be executed via a yielded action to the block.

```hbs
{{#print-this printSelector=".customContent" as |doPrint|}}
  <div class="customContent">
    <p>My cool content</p>
  </div>

  <button onclick={{doPrint}}>Press me!</button>
{{/print-this}}
```

Printing can be done via a service.
```js
export default Ember.Component.extend({
  printThis: Ember.inject.service(),
  actions: {
    doPrint() {
      const selector = '.myClass';
      const options = {
        printDelay: 500
      }

      this.get('printThis').print(selector, options);
    }
  },
});
```
## Contributing to this addon
### Installation

* `git clone git@github.com:LucasHill/ember-print-this.git` this repository
* `cd ember-print-this`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
