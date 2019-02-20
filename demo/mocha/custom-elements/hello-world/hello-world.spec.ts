import './hello-world'

import { expect } from 'chai'

describe('HelloWorld', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('hello-world')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeChild(element)
  })

  it('should have element', () => {
    expect(element).not.undefined
  })

  it('should have shadowRoot.', () => {
    expect(element.shadowRoot).not.undefined
  })

  it('should initialize attribute and property.', () => {
    document.body.removeChild(element)

    const template = document.createElement('template')
    template.innerHTML = `
      <hello-world message="World"></hello-world>
    `
    document.body.appendChild(document.importNode(template.content, true))
    element = document.querySelector('hello-world')
    
    expect(element.hasAttribute('message')).to.true
    expect(element.getAttribute('message')).to.equal('World')
    expect(element.message).to.equal('World')
  })

  it('should have h1 element.', () => {
    element = document.body.querySelector('hello-world')

    expect(element.shadowRoot.querySelector('h1')).not.undefined
  })

})