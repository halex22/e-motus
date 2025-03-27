import './style.css'

document.querySelector<HTMLButtonElement>('#add-bnt')!.addEventListener('click', () => {
  document.querySelector('main')!.appendChild(document.createElement('create-dialog'))
})