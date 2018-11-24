import { observable, action } from 'mobx'

class Store {
    @observable files = []
    @observable lang = 'en-US'
    @observable tmdb_api_key = ''
    @observable clicked_index = -1

    @action addFile(file) {
        this.files = this.files.concat(file);
    }

    @action resetFiles() {
        this.files = []
    }

    @action getFiles() {
        return this.files
    }
}

const store = new Store()
export default store