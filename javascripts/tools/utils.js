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
        return path.substr(path.lastIndexOf('.'))
    },
    twoDigitNumber: (number) => {
        return ('0' + number).slice(-2)
    }
}