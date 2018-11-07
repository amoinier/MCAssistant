import { observable, action } from 'mobx'

class Store {
    @observable files = []

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