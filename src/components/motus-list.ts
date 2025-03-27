import MotusCard from "./motus-card"
import EMotusService from "../services/motus-service"

export default class MotiList extends HTMLElement {
  service = new EMotusService()

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    document.addEventListener('success-save', () => {
      this.render()
    })
  }

  connectedCallback() {
    this.styleComponent()
    this.render()
  }

  async render() {
    await this.service.loadMoti()
    let container = this.shadowRoot!.getElementById('container')

    if (container) {
      container.innerHTML = ''
    } else {
      container = document.createElement('div')
      container.id = 'container'
      container.classList.add('grid')
      this.shadowRoot!.appendChild(container)
    }

    this.service.moti.forEach((motus, index) => {
      console.warn('\nlogging emotion ', index)
      console.log('motus before going to card')
      console.log(motus)
      const card: MotusCard = document.createElement('motus-card') as MotusCard
      console.log('timestamp of card creation', JSON.stringify(card))
      card.motus = motus
      // card.setAttribute('selected-motus',JSON.stringify(motus))
      console.log('card after been created:')
      console.log(card)
      container.appendChild(card)
      console.log('log after appending child')
    })
  }

  styleComponent() {
    const style = document.createElement('style')
    style.innerHTML = `
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
      }

    `
    this.shadowRoot!.appendChild(style)
  }
}

customElements.define('moti-list', MotiList)