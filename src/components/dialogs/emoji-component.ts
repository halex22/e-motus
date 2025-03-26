export default class EmojiContainer extends HTMLElement {
  private _emoji!: string
  private _emojiValue!: string
  private _isSelected!: boolean
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.styleComponent()
    this.render()
  }

  styleComponent() {
    const style = document.createElement('style')
    style.innerHTML = `
      span {
      padding: 0 1rem;
      font-size: 20px;
      ${this.isSelected && 'background-color: rgb(145, 250, 145);'}
      }
    `
    this.shadowRoot!.appendChild(style)
  }

  render() {
    const span = document.createElement('span')
    const emoji = document.createTextNode(this.emoji)
    span.appendChild(emoji)
    this.shadowRoot!.appendChild(span)
    
    this.addEventListener('click', () => {
      this.dispatchEmoji()
    })
  }

  dispatchEmoji() {
    const event = new CustomEvent<string>('emoji-value', { detail: this.emojiValue });
    document.dispatchEvent(event);
  }

  set emoji(val: string) {
    this._emoji = val
  }

  get emoji(): string {
    return this._emoji
  }

  set emojiValue(val) {
    this._emojiValue = val
  }

  get emojiValue() {
    return this._emojiValue
  }

  get isSelected() {
    return this._isSelected
  }

  set isSelected(val) {
    this._isSelected = val
  }

}

customElements.define('emoji-container', EmojiContainer)