import './style.css'

document.querySelector<HTMLButtonElement>('#add-bnt')!.addEventListener('click', () => {
  document.querySelector('main')!.appendChild(document.createElement('create-dialog'))
})

const motiList = document.createElement('moti-list')
document.getElementById('motus-id-container')!.appendChild(motiList)