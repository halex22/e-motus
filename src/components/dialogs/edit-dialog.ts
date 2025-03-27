import emojis from '../../../public/emojis.json'
import EmojiContainer from './emoji-component'
import BaseDialog from './base-dialog'
import Motus from '../../models/motus'


export default class EditDialog extends BaseDialog {

  constructor() {
    super()
  }
 
  makeDocumentListenEvent(): void {
    document.addEventListener('confirm-status', (event) => this.handleEmojiEvent(event as CustomEvent<string>))
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

  addListenerToForm(): void {
    this.form.addEventListener('submit', event => {
      event.preventDefault()
      console.log('prevented')
    })
  }

  // addListenerToForm() {
  //   this.form.addEventListener('submit', async (event) => {
  //     event.preventDefault()
  //     if (!this.userSelectEmoji) {
  //       alert('please select an emotion')
  //       return 
  //     }
  //     await this.service.loadMoti()
  //     this.service.addMotus(this.createMotus())
  //     const successEvent = new Event('success-save')
  //     document.dispatchEvent(successEvent)
  //     this.remove()
  //   })
  // }

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

customElements.define('edit-dialog', EditDialog)