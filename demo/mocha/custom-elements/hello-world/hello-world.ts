import { html, render } from 'lit-html'

class HelloWorld extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  } 

  connectedCallback() {
    for(const prop of (this.constructor as any).observedAttributes) {
      if (this.hasAttribute(prop)) {
        this[prop] = this.getAttribute(prop)
      }
    }
    this.render()
  }

  static get observedAttributes() {
    return [ 'message' ]
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render()
    }
  }

  get message() {
    return this.getAttribute('message')
  }

  set message(value) {
    this.setAttribute('message', value)
  }

  render() {
    render(html `<h1>Hello ${this.message}</h1>`, this.shadowRoot)
  }

}

customElements.define('hello-world', HelloWorld)