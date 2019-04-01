import { LitCustomElement as CustomElement, html } from 'lit-custom-element'
import './hello-world.css'

class HelloWorldStyles extends CustomElement {

  private _message;

  get message() {
    return this._message
  }

  set message(value) {
    this._message = value
    this.onPropertyChanged('message')
  }

  render() {
    return html `<h1>Hello ${ this.message}</h1>`
  }

}


customElements.define('hello-world-styles', HelloWorldStyles)