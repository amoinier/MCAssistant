import { observable, action } from 'mobx'
import fs from 'fs'

class Store {
    @observable files = []
    @observable settings = {
        lang: 'en',
        tmdb_api_key: '',
        providers: ['TMDB'],
        shows: {
            path: './:original_title: (:year:) - S:season: E:episode:',
            poster: false,
        },
        movies: {
            path: './:original_title: (:year:)',
            poster: false
        }
    }
    @observable clicked_index = -1
    @observable charged_component = null
    @observable chaged_type = null

    @action addFile(file) {
        this.files = this.files.concat(file);
    }

    @action resetFiles() {
        this.files = []
    }

    @action getFiles() {
        return this.files
    }

    @action deleteFiles(index) {
        this.files.splice(index, 1)
    }

    @action writeConfig() {
        let userhome = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']

        if (!fs.existsSync(`${userhome}/.MCAssistant.conf`)) {
            fs.openSync(`${userhome}/.MCAssistant.conf`, 'w');
        }

        fs.writeFile(`${userhome}/.MCAssistant.conf`, JSON.stringify(this.settings), (err, data) => {
        })
    }

    @action getConfigFile() {
        let userhome = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']

        fs.readFile(`${userhome}/.MCAssistant.conf`, (err, data) => {
            if (err) {
                return null;
            }
            else {
                let datas = JSON.parse(data.toString())

                this.settings = datas
            }
        })
    }
}

const store = new Store()
export default store