
const { inlineCustomElement } = require('lit-custom-element/plugins/inline-plugin')

exports.rollupPlugins = [ 
  inlineCustomElement()
]