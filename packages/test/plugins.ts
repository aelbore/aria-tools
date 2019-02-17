export const PLUGINS = {
  plugins: [
    require('karma-jasmine'),
    require("karma-mocha-reporter"),
    require("karma-chrome-launcher"),
    require("karma-coverage-istanbul-reporter"),
    require('./karma-rollup')
  ]
}