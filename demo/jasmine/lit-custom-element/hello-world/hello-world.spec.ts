import './hello-world'

describe('HelloWorld', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('hello-world-styles')
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.removeChild(element)
  })

  it('should have element', () => {
    expect(element).toBeDefined()
  })

  it('should have shadowRoot.', () => {
    expect(element.shadowRoot).toBeDefined()
  })

  it('should initialize attribute and property.', () => {
    document.body.removeChild(element)

    const template = document.createElement('template')
    template.innerHTML = `
      <hello-world-styles message="World"></hello-world-styles>
    `
    document.body.appendChild(document.importNode(template.content, true))
    element = document.querySelector('hello-world-styles')
    
    expect(element.hasAttribute('message')).toBeTruthy()
    expect(element.getAttribute('message')).toEqual('World')
    expect(element.message).toEqual('World')
  })

  it('should have h1 element.', () => {
    element = document.body.querySelector('hello-world-styles')

    expect(element.shadowRoot.querySelector('h1')).toBeDefined()
  })

  it('should have styles static get accessor', () => {
    const style: HTMLStyleElement = element.shadowRoot.querySelector('style');
    
    expect(style).toBeDefined()
    expect(style.textContent).toEqual('h1 { color: red; }')
  })

})