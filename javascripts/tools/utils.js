let async = require('async')
let axios = require('axios')

const providers = require('../tools/providers')

module.exports = {
    listExtensions: () => {
        return ['.srt', '.mkv', '.avi', '.mp4', '.flv', '.webm', '.mov', '.wmv']
    },
    pathToFilename: (path) => {
        return path.substr(path.lastIndexOf('/') + 1, path.length)
    },
    translatePath: (stringPath, elem) => {
        let path = stringPath

        while(path.match(/:([A-Za-z\_]*?)?:/gmi)) {
            console.log(path.match(/:([A-Za-z\_]*?)?:/gmi));
            
            let read = new RegExp(/:([A-Za-z\_]*?)?:/gmi).exec(path)

            if (read.length !== 0 && read[1]) {
                path = path.replace(`:${read[1]}:`, elem[read[1]] || '')
            }
        }

        return `${path}${module.exports.getFileExtension(elem.path)}`
        
    },
    wordLetterUppercase: (text) => {
        if (!text)
            return null

        text = text.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')

        return text
    },
    getFileExtension: (path) => {
        return path.lastIndexOf('.') > 0 ? path.substr(path.lastIndexOf('.')) : ''
    },
    delFileExtenstion: (path) => {
        let ext = module.exports.getFileExtension(path)

        return ext.length <= 5 ? path.substr(0, path.length - ext.length) : path
    },
    twoDigitNumber: (number) => {
        return ('0' + number).slice(-2)
    },
    getAllProposalNames: (name) => {
        if (!name)
            return []

        let names = []
        let splitName = name.split(' ')

        for (let i = 0; i < splitName.length; i++) {
            names.push(splitName.filter((val, ind) => {return ind < (splitName.length - i)}).join(' '))
            names.push(splitName.filter((val, ind) => {return ind > i}).join(' '))
        }

        names = names.filter((elem) => {return !!elem && elem.length > 2})
        names = names.length == 0 ? [name] : names
        names.sort((a, b) => {return b.length - a.length})

        return names
    },
    findElemByUuid: (uuid, array) => {
        for (var i = 0; i < array.length; i++) {
            if (uuid == array[i].uuid) {
                return i
            }
        }

        return null
    },
    getFileRealInfo: (file, option, cb) => {
        let renames = []   

        async.eachOfLimit(file.proposals, 3, (tit, tkey, tcb) => {
            async.eachOfLimit(file.years, 3, (yea, ykey, ycb) => {
                async.eachOfLimit(option.providers, 3, (prov, pkey, pcb) => {
                    let url
                    let index = providers.filter((elem) => elem.name == prov)

                    yea = option.use_year ? yea : null
        
                    if (option.type == 'shows') {
                        url = `https://api.themoviedb.org/3/search/tv?api_key=${option.tmdb_api_key}&language=${option.lang}&query=${tit}`;
                    }
                    else {
                        url = `https://api.themoviedb.org/3/search/movie?api_key=${option.tmdb_api_key}&language=${option.lang}&query=${tit}${yea ? `&primary_release_year=${yea}` : ``}`;
                    }
                    axios.get(url)
                    .then(resp => {
                        renames = renames.concat(resp.data.results)

                        return pcb()
                    })
                    .catch(err => {
                        return pcb(err)
                    })
                }, (err) => {
                    return ycb(err)
                })

            }, (err) => {
                return tcb(err)
            })
        }, (err) => {
            return cb(err, renames)
        })
    },
}