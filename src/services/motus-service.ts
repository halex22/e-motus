import { type Motus } from "../models/motus"

export default class EMotusService {
  private storageKey = 'motiStorage'
  moti: Motus[] = []

  constructor() {
  }

  async loadMoti(){
    const localMotiString = localStorage.getItem(this.storageKey)
    if (localMotiString){
      console.info('loading from storage')
      this.moti = JSON.parse(localMotiString)
    } else {
      
      this.moti = await this.getMotiFromJson()
      this.saveMoti() 
    }
  }

  getMotiFromJson(){
    return fetch('/emotions.json')
    .then(res => res.json())
  }

  saveMoti(){
    localStorage.setItem(this.storageKey, JSON.stringify(this.moti))
  }

  addMotus(motus: Motus) {
    this.moti.push(motus)
    this.saveMoti()
  }

  editMotus() {}
}

