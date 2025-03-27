import Motus from "../models/motus"

export default class EMotusService {
  private storageKey = 'motiStorage'
  _moti: Motus[] = []

  constructor() {
  }

  async loadMoti(){
    const localMotiString = localStorage.getItem(this.storageKey)
    if (localMotiString){
      console.info('loading from storage')
      this._moti = JSON.parse(localMotiString)
    } else {
      
      this._moti = await this.getMotiFromJson()
      this.saveMoti() 
    }
  }

  get moti() {
    return this._moti.map(motus => new Motus(motus.id, motus.note, motus.value , motus.creationDate))
  }

  getMotiFromJson(){
    return fetch('/emotions.json')
    .then(res => res.json())
  }

  saveMoti(){
    localStorage.setItem(this.storageKey, JSON.stringify(this._moti))
  }

  addMotus(motus: Motus) {
    console.log(motus)
    this._moti.push(motus)
    this.saveMoti()
  }
  editMotus() {}
}

