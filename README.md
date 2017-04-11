# Ember-Print-This


[![Build Status](https://travis-ci.org/LucasHill/ember-print-this.svg?branch=master)](https://travis-ci.org/LucasHill/ember-print-this)
[![npm version](https://badge.fury.io/js/ember-print-this.svg)](https://badge.fury.io/js/ember-print-this)
[![Ember Observer Score](http://emberobserver.com/badges/ember-print-this.svg)](http://emberobserver.com/addons/ember-print-this)

Ember component wrapper for the great [printThis](https://github.com/jasonday/printThis) jQuery plugin.
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

## Developing this addon
### Installation

* `git clone <repository-url>` this repository
* `cd ember-print-this`
* `npm install`
* `bower install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
