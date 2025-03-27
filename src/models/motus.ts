// import { Location } from "./types"


interface Location {
  lat: number
  lng: number
}


export default class Motus {

  // creationDate?: number
  location?: Location

  constructor(public id: string, public note: string, public value: number, public creationDate?: number) {
    if(!this.creationDate) this.creationDate = Date.now()
  }

  get StringDate() {
    return new Date(Date.now()).toLocaleString()
  }


  orderByDate(otherMotus: Motus) {
    return this.creationDate! - otherMotus.creationDate! 
  }

  orderByEmotionsValue(otherMotus: Motus) {
    return this.value - otherMotus.value
  }

}