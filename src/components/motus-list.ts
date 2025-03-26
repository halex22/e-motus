import { type Motus } from "../models/motus"
import eMotusService from "../services/motus-service"
import MotusCard from "./motus-card"

export default class MotiList extends HTMLElement {
  moti!: Motus[] 
  service = eMotusService

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.moti = this.service.moti
    this.styleComponent()
    this.render()
  }

  render() {

    let container = this.shadowRoot!.getElementById('container')

    if (container) {
      container.innerHTML = ''
    } else {
      container = document.createElement('div')
      container.id = 'container'
      container.classList.add('grid')
      this.shadowRoot!.appendChild(container)
    }

    this.moti.forEach(motus => {
      const card: MotusCard = document.createElement('motus-card') as MotusCard
      card.motus = motus
      container.appendChild(card)
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