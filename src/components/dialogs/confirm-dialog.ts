export default class ConfirmDialog extends HTMLElement {
  private dialog: HTMLDialogElement = document.createElement('dialog')
  message!: string

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
    this.styleComponent()
  }

  styleComponent() {
    const style: HTMLStyleElement = document.createElement('style')
    style.innerHTML = `
      :host {
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
        font-size: 20px;
        background-color: black;
        color: white;
      }

        
    `
    this.shadowRoot?.appendChild(style)
  }

  render() {
    this.dialog.open = true
    const p = document.createElement('p')
    p.innerText = 'are you sure you want to ' + this.message
    this.dialog.appendChild(p)
    this.renderBtns()
    this.shadowRoot?.appendChild(this.dialog)
  }

  renderBtns() {
    const cancelBtn = document.createElement('button')
    cancelBtn.innerText = 'cancel'
    cancelBtn.addEventListener('click', () => {
      this.remove()
    })

    const okBtn = document.createElement('button')
    okBtn.innerText = 'ok'
    okBtn.addEventListener('click', () => {
      this.dispatchConfirmStatus()
      this.remove()
    })

    this.dialog.append(cancelBtn, okBtn)
  }

  dispatchConfirmStatus() {
    const myEvent = new Event('confirm-status')
    document.dispatchEvent(myEvent)
  }
} 

customElements.define('confirm-dialog', ConfirmDialog)