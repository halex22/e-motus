import emojis from '../../../public/emojis.json'
import EmojiContainer from './emoji-component'
import EMotusService from '../../services/motus-service'
import Motus from '../../models/motus'


export default class CreateDialog extends HTMLElement {
  private userSelectEmoji: string | null  = null
  private form: HTMLFormElement = document.createElement('form')
  private service = new EMotusService()

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }
 
  connectedCallback() {
    this.myStyle()
    this.render()
    document.addEventListener('emoji-value', (event) => this.handleEmojiEvent(event as CustomEvent<string>))
  }

  myStyle(): void {
    const style: HTMLStyleElement = document.createElement('style')
    style.innerHTML = `
    dialog {
    box-shadow: 0px 10px 15px 15px rgba(0,0,0,0.1);
    border: 1px solid rgb(198, 198, 198);
    border-radius: 8px;
    padding: 20px;
    }
    dialog::backdrop {
      background-color: rgba(122, 122, 122, 0.8);
      backdrop-filter: blur(3px);
    }
    `
    this.shadowRoot!.appendChild(style)
  }

  handleEmojiEvent (event: CustomEvent<string>)  {
    this.userSelectEmoji = event.detail
    this.renderEmojisArray()
  }

  render():void {
    const dialog: HTMLDialogElement = document.createElement('dialog')
    this.shadowRoot!.appendChild(dialog)
    dialog.showModal()


    dialog.appendChild(this.form)
    this.addListenerToForm()
    
    const label = document.createElement('label')
    label.innerText = 'Click how you feel Today'
    this.form.appendChild(label)

    const motiContainer = document.createElement('div')
    motiContainer.id = 'moti-container'
    this.form.appendChild(motiContainer)
    this.renderEmojisArray()

    this.form.appendChild(this.createTextArea())
    this.form.appendChild(this.createBtns())
  }

  createBtns(): HTMLDivElement {
    const div = document.createElement('div')
    div.classList.add('btn-container')

    const cancelBtn = document.createElement('button')
    cancelBtn.innerText = 'cancel'
    cancelBtn.addEventListener('click', () => {
      this.remove()
    })

    const okBtn = document.createElement('button')
    // okBtn.type = 'button'
    okBtn.innerText = 'ok'

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

  renderEmojisArray() {
    const container = this.shadowRoot?.getElementById('moti-container')!
    container.innerHTML = ''
    Object.entries(emojis).forEach( emoji => {
      const emojiContainer = document.createElement('emoji-container') as EmojiContainer
      emojiContainer.emoji = emoji[1]
      emojiContainer.emojiValue = emoji[0]
      emojiContainer.isSelected = !!this.userSelectEmoji && this.userSelectEmoji === emoji[0]  
      container.appendChild(emojiContainer)
    })
  }

  // protected isEmojiSelected(emoji: string) {
  //   // return !!this.userSelectEmoji && this.userSelectEmoji === emoji
  //   return this.motus!.value === parseInt(emoji)
  // }

  addListenerToForm() {
    this.form.addEventListener('submit', async (event) => {
      event.preventDefault()
      if (!this.userSelectEmoji) {
        alert('please select an emotion')
        return 
      }
      await this.service.loadMoti()
      this.service.addMotus(this.createMotus())
      const successEvent = new Event('success-save')
      document.dispatchEvent(successEvent)
      this.remove()
    })
  }

  createMotus() {
    const data = new FormData(this.form)

    const timeStamp = Date.now()
    const note = String( data.get('description'))
    const newMotus = new Motus(
      `user1-${timeStamp}`,
      note ? note : 'no description given',
      parseInt(this.userSelectEmoji!)
    )
    return newMotus
  }

}

customElements.define('create-dialog', CreateDialog)