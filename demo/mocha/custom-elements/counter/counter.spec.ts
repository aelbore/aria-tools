import './counter'

import { expect } from 'chai'

describe('Counter', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('ar-counter')
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

})