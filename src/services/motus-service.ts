import { type Motus } from "../models/motus"

class EMotusService {
  static instance: EMotusService
  private storageKey = 'motiStorage'
  moti: Motus[] = []
  constructor() {
    if (EMotusService.instance) return EMotusService.instance
    EMotusService.instance = this
    this.loadMoti()
  }

  async loadMoti(){
    const localMotiString = localStorage.getItem(this.storageKey)
    if (localMotiString){
      this.moti = JSON.parse(localMotiString)
    } else {
      this.moti = await this.getMotiFromJson() 
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
    console.log(motus)
    // this.moti.push(motus)
    // this.saveMoti()
    // return this.moti
  }

  editMotus() {}
}

const eMotusService = new EMotusService()
await eMotusService.loadMoti()
export default eMotusService
