import './style.css'

document.querySelector<HTMLButtonElement>('#add-bnt')!.addEventListener('click', () => {
  document.querySelector('#dialog-container')!.appendChild(document.createElement('create-dialog'))
})

const motiList = document.createElement('moti-list')
document.getElementById('motus-id-container')!.appendChild(motiList)