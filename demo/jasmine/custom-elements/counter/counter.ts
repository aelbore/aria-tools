import { LitElement, html, css } from 'lit-element'

class Counter extends LitElement {

  count: number;

  static get properties() {
    return {
      count: {
        type: String,
        value: 0
      }
    }
  }

  static get styles() {
    return css `
      :host { display: inline-block; }
      :host button {
        width: 50px;
        height: 50px;
        color: white;
        background-color: #000;
        border: 0;
        border-radius: 5px;
        font-size: 20px;
        outline: none;
        cursor: pointer;
      }      
    `
  }

  incrementCount(e: CustomEvent) {
    this.count = this.count + 1
  }

  render() {
    return html `
      <button id="count" @click=${this.incrementCount}>
        ${this.count}
      </button>   
    `
  }

}

customElements.define('ar-counter', Counter)