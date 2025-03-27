import Motus from "../../models/motus"
import emotions from "../../../public/emojis.json"
import EditDialog from "../dialogs/edit-dialog"

export default class MotusCard extends HTMLElement {
  motus!: Motus
  constructor() {
    super()
    this.attachShadow({mode:'open'})
  }

  connectedCallback() {
    // console.assert(!!this.motus, 'motus is invalid')
    this.styleComponent()
    this.render()
  }


  render() {
    // console.warn("motus when rendering",this.motus)
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('motus-container')

    const emoticonContainer = document.createElement('div')
    emoticonContainer.classList.add('emoji-container')
    const emojiSpan = document.createElement('span')
    const emId: string = String(this.motus.value) 
    emojiSpan.innerText = Object(emotions)[emId]
    emoticonContainer.appendChild(emojiSpan)
    const infoContainer = document.createElement('div')
    infoContainer.classList.add('info-container')

    cardDiv.appendChild(emoticonContainer)
    cardDiv.appendChild(infoContainer)

    const dateSpan = document.createElement('span')
    dateSpan.innerText = this.motus.StringDate
    infoContainer.appendChild(dateSpan)

    const noteP = document.createElement('p')
    noteP.innerText = this.motus?.note
    infoContainer.appendChild(noteP)
    cardDiv.appendChild(this.createDeleteBtn())

    this.shadowRoot!.appendChild(cardDiv)
    
  }

  styleComponent() {
    const style: HTMLStyleElement = document.createElement('style')
    style.innerHTML = `
      :host {
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
        font-size: 20px;
        position: relative;
        padding: 1rem;
      }
      .motus-container {
        display: grid;
        grid-template-columns: 2fr 3fr;
      }

      .emoji-container {
        font-size: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .btns-container {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 0 1rem 1rem 0;
        display: flex;
      }
      .rm-btn {
        background-color: inherit;
        border: 0;
        font-size: 1rem;
      }

      .rm-btn:hover {
        font-size: 1.25rem
      }
        
    `
    this.shadowRoot?.appendChild(style)
  }

  createDeleteBtn() {
    const div = document.createElement('div')
    div.classList.add('btns-container')
    const btn = document.createElement('button')
    btn.classList.add('rm-btn')
    div.appendChild(btn)
    btn.innerText = '🗑️'

    const editBtn = document.createElement('div')
    editBtn.innerText =  "✏️"
    editBtn.addEventListener('click', (event) => {
      const dialog = document.createElement('edit-dialog') as EditDialog
      dialog.motus = this.motus
      this.shadowRoot?.appendChild(dialog) 
    })
    div.appendChild(editBtn)

    // btn.addEventListener('click', () => {
    //   const confirmDialog = document.createElement('confirm-dialog')  as ConfirmDialog
    //   confirmDialog.message = 'delete'
    //   this.shadowRoot?.appendChild(confirmDialog)
    // })

    return div
  }
}

customElements.define('motus-card', MotusCard)