import emojis from '../../../public/emojis.json'
import EmojiContainer from './emoji-component'

export default class CreateDialog extends HTMLElement {
  private userSelectEmoji: string | null  = null

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.handleEmojiEvent = this.handleEmojiEvent.bind(this);
  }
 

  connectedCallback() {
    this.myStyle()
    this.render()
    document.addEventListener('emoji-value', this.handleEmojiEvent as EventListener)
  }

  myStyle(): void {
    const style: HTMLStyleElement = document.createElement('style')
    this.shadowRoot!.appendChild(style)
  }

  handleEmojiEvent (event: CustomEvent<string>)  {
    event.preventDefault()
    console.log(event.detail, 'emoji id')
    this.userSelectEmoji = event.detail
    this.render()
  }

  render():void {
    const dialog: HTMLDialogElement = document.createElement('dialog')
    dialog.open = true
    const form: HTMLFormElement = document.createElement('form')
    dialog.appendChild(form)

    const label = document.createElement('label')
    label.innerText = 'Click how you feel Today'
    form.appendChild(label)
    form.appendChild(this.createEmojis())

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

  createEmojis() {
    const div = document.createElement('div')
    Object.entries(emojis).forEach( emoji => {
      const emojiContainer = document.createElement('emoji-container') as EmojiContainer
      emojiContainer.emoji = emoji[1]
      emojiContainer.emojiValue = emoji[0]
      emojiContainer.isSelected = !!this.userSelectEmoji && this.userSelectEmoji === emoji[0]  
      div.appendChild(emojiContainer)
    })
    return div
  }

}

customElements.define('create-dialog', CreateDialog)