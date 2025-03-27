import { Motus } from "../models/motus"
import emotions from "../../public/emojis.json"


export default class MotusCard extends HTMLElement {
  // motus!: Motus
  constructor() {
    super()
    this.attachShadow({mode:'open'})
  }

  connectedCallback() {
    this.styleComponent()
    this.render()
  }

  get motus() {
    return JSON.parse(this.getAttribute('selected-motus')!)
  }

  render() {

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('motus-container')

    const emoticonContainer = document.createElement('div')
    emoticonContainer.classList.add('emoji-container')
    const emojiSpan = document.createElement('span')
    const emId: string = String(this.motus.value) ?? '0'
    emojiSpan.innerText = Object(emotions)[emId]
    emoticonContainer.appendChild(emojiSpan)
    const infoContainer = document.createElement('div')
    infoContainer.classList.add('info-container')

    cardDiv.appendChild(emoticonContainer)
    cardDiv.appendChild(infoContainer)

    const dateSpan = document.createElement('span')
    // dateSpan.innerText = String(Date.parse(this.motus.creationDate))
    dateSpan.innerText = new Date(this.motus.creationDate).toLocaleTimeString()
    infoContainer.appendChild(dateSpan)

    const noteP = document.createElement('p')
    noteP.innerText = this.motus?.note
    infoContainer.appendChild(noteP)

    this.shadowRoot!.appendChild(cardDiv)
    
  }

  styleComponent() {
    const style: HTMLStyleElement = document.createElement('style')
    style.innerHTML = `
      :host {
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
        font-size: 20px;
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
        
    `
    this.shadowRoot?.appendChild(style)
  }

  createDeleteBtn() {
    const btn = document.createElement('button')
    btn.innerText = 'delete'
  }
}

customElements.define('motus-card', MotusCard)