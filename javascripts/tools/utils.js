module.exports = {
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
        if (!name) {
            return []
        }

        let names = []
        let splitName = name.split(' ')

        for (let i = 0; i < splitName.length; i++) {
            names.push(splitName.filter((val, ind) => {return ind < (splitName.length - i)}).join(' '))
        }

        for (let i = 0; i < splitName.length; i++) {
            names.push(splitName.filter((val, ind) => {return ind > i}).join(' '))
        }
        names = names.filter((elem) => {return !!elem && elem.length > 2})
        names.sort((a, b) => {return a.length < b.length})

        console.log(names);
        

        return names
    }
}