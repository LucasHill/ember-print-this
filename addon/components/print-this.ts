import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import PrintThisService from 'ember-print-this/services/print-this';
import $ from 'jquery';

interface PrintThisArgs {
  printSelector?: string;
  autoPrint?: boolean;
  options?: PrintThisOptions
}

export default class PrintThis extends Component<PrintThisArgs> {
  printThisElement?: Element;

  @inject declare printThis: PrintThisService;

  @action initialize(element: Element) {
    this.printThisElement = element;
    if(this.args.autoPrint) {
      this.print();
    }
  }

  @action print() {
    if(!this.printThisElement) {
      throw `Unexpected error, printThisElement is unset'` 
    }

    let selectedElement: JQuery<Element>;
    
    const componentElement = $(this.printThisElement);
    if(this.args.printSelector) {
      const results = $(componentElement).find(this.args.printSelector)
      if(results.length === 0) {
        throw `'printSelector' was not found in the block content of this component`;
      }
      selectedElement= results;
    } else {
      selectedElement = componentElement.eq(0);
    }

    this.printThis.print(selectedElement, this.args.options || {});    
  }

}
