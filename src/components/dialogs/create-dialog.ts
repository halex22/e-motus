export default class CreateDialog extends HTMLElement {
  private userSelectEmoji: number | null  = null

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.myStyle()
    this.render()
  }

  myStyle(): void {
    const style: HTMLStyleElement = document.createElement('style')
    this.shadowRoot!.appendChild(style)
  }

  render():void {
    const dialog: HTMLDialogElement = document.createElement('dialog')
    dialog.open = true
    const form: HTMLFormElement = document.createElement('form')
    dialog.appendChild(form)

    const label = document.createElement('label')
    label.innerText = 'Click how you feel Today'
    form.appendChild(label)
    // qui dobbiamo generare gli emoticon 

    form.appendChild(this.createTextArea())

    form.appendChild(this.createBtns())

    this.shadowRoot!.appendChild(dialog)
  }

  createBtns(): HTMLDivElement {
    const div = document.createElement('div')
    div.classList.add('btn-container')
    const cancelBtn = document.createElement('button')
    const okBtn = document.createElement('button')
    div.append(cancelBtn, okBtn)

    return div
  }

  createTextArea(): HTMLDivElement {
    const div = document.createElement('div')
    div.innerHTML = `
      <label style="display: block;" for="description">Add a description</label>
      <textarea name="description" id="description"></textarea>  
    `
    return div
  }

}

customElements.define('create-dialog', CreateDialog)