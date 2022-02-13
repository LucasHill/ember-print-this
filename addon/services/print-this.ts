import Service from '@ember/service';
import { getOwner } from '@ember/application';
import $ from 'jquery';

export default class PrintThis extends Service {
  print(printSelectorOrElement: string | JQuery<Element>, options: PrintThisOptions, jQuery = $) {
    if(!printSelectorOrElement) {
      throw 'A selector or element must be provided';
    }

    const environment =
    //@ts-expect-error
      getOwner(this).resolveRegistration('config:environment');
    
      const mergedOptions = this.constructPrintOptions(environment, options);
    
    if(typeof printSelectorOrElement === 'string') {
      jQuery(printSelectorOrElement).printThis(mergedOptions);
    } else {
      printSelectorOrElement.printThis(mergedOptions);
    }
  }
  
  constructPrintOptions(environment: {rootURL?: string, baseURL?: string} = { rootURL: '/' }, userOptions: PrintThisOptions = {}): PrintThisOptions {
    const base = environment.rootURL || environment.baseURL;
    const options = base === '/' ? {} : { base };
    
    return { ...options, ...userOptions };
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'print-this': PrintThis;
  }
}
