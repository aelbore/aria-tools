[![npm version](https://badge.fury.io/js/aria-tools.svg)](https://www.npmjs.com/package/aria-tools)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# aria-tools
Simple testing tools, zero configuration command line interface

Installation
------------

* Jasmine 
  ```
    npm install --save-dev aria-tools @types/jasmine
  ```

* Mocha Chai
  ```
    npm install --save-dev aria-tools @types/mocha @types/chai
  ```

Usage
-----
* By default it will look `.spec.ts` files in your `src` folder
  ```
  aria test <dir>
  ```
  * custom extension name of your spec files
    <br />
    
    ```
    aria test <dir> --extname .test.ts
    ```
* Serve your test coverage
  * open in your browser 
  * http://localhost:9899
  <br />
  
  ```
  aria serve --test-coverage
  ```

Demo
----
* [ Jasmine ](https://github.com/aelbore/aria-tools/tree/master/demo/jasmine/custom-elements)
* [ Mocha-Chai ](https://github.com/aelbore/aria-tools/tree/master/demo/mocha/custom-elements)


