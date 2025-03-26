class StorageService {
  static instance: StorageService

  constructor() {
    if (StorageService.instance) return StorageService.instance
    StorageService.instance = this
  }
}

const storageNumber = new StorageService()
export default storageNumber