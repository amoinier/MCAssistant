let async = require('async')
let axios = require('axios')


module.exports = {
    listExtensions: () => {
        return ['.srt', '.mkv', '.avi', '.mp4', '.flv', '.webm', '.mov', '.wmv']
    },
    pathToFilename: (path) => {
        return path.substr(path.lastIndexOf('/') + 1, path.length)
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
            async.eachOfLimit(file.year, 3, (yea, ykey, ycb) => {
                let url

                yea = option.use_year ? yea : null
    
                if (file.type == 'series') {
                    url = `https://api.themoviedb.org/3/search/tv?api_key=${option.tmdb_api_key}&language=${option.lang}&query=${tit}&page=1&include_adult=true`;
                }
                else {
                    url = `https://api.themoviedb.org/3/search/movie?api_key=${option.tmdb_api_key}&language=${option.lang}&query=${tit}${yea ? `&primary_release_year=${yea}` : ``}&page=1&include_adult=true`;
                }
                axios.get(url)
                .then(resp => {
                    renames = renames.concat(resp.data.results)

                    return ycb()
                })
                .catch(err => {
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