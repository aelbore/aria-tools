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
  * available options
    * custom extension name of your spec files
    ```
    aria test <dir> --extname .test.ts
    ```
* Serve your test coverage
  * open in your browser 
  * http://localhost:9899
  ```
  aria serve --test-coverage
  ```






