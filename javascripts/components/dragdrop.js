import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedical } from '@fortawesome/free-solid-svg-icons'
import ReactDropzone from "react-dropzone"
import { observer } from 'mobx-react'
import ptn from 'parse-torrent-name'
import fs from 'fs'
import async from 'async'
import axios from 'axios'
import parseVideo from 'video-name-parser'

import store from '../tools/store'
import utils from '../tools/utils'

@observer
class DragDrop extends Component {
    componentWillMount() {
        store.resetFiles()
    }

    onDrop(files) {
        files.forEach((elem) => {
            if (fs.lstatSync(elem.path).isDirectory()) {
                recursiveFolderContent(elem.path, err => {

                })
            }
            else {
                if (!checkIfExist(elem.path)) {
                    let parsed = ptn(utils.pathToFilename(elem.path))
                    parsed.datas = parseVideo(utils.pathToFilename(elem.path))
                    parsed.path = elem.path
                    parsed.rename = []
                    store.addFile(parsed)
                    getFileRealInfo(parsed, store.files.length - 1, () => {})
                    console.log(parsed);
                }

            }
        })  

    }

    render() {
            return (
                <div className='dragdrop' style={store.files.length == 0 ? {justifySelf: 'center'} : {}}>
                    <ReactDropzone className={store.files.length == 0 ? 'blockdrag' : 'hidedrag'} disableClick={store.files.length == 0 ? false : true} onDrop={this.onDrop}>
                        {this.props.children}
                    </ReactDropzone>
                </div>
        )
    }
}

export default DragDrop


let recursiveFolderContent = (folder, cb) => {
    if (fs.lstatSync(folder).isSymbolicLink()) {
        return cb()
    }

    fs.readdir(folder, (err, files) => {
        if (err) {
            return each_cb()
        }
        else {
            async.eachOf(files, (elem, index, each_cb) => {
                if (!fs.lstatSync(`${folder}/${elem}`).isSymbolicLink() && !fs.lstatSync(`${folder}/${elem}`).isDirectory()) {
                    if (!checkIfExist(`${folder}/${elem}`)) {
                        let parsed = ptn(utils.pathToFilename(`${folder}/${elem}`))
                        parsed.datas = parseVideo(utils.pathToFilename(`${folder}/${elem}`))
                        parsed.path = `${folder}/${elem}`
                        parsed.rename = []
                        store.addFile(parsed)
                        getFileRealInfo(parsed, store.files.length - 1, () => {})
                    }
                    return each_cb()
                }
                else if (fs.lstatSync(`${folder}/${elem}`).isDirectory()) {
                    recursiveFolderContent(`${folder}/${elem}`, (err) => {
                        return each_cb(err)
                    })
                }
            }, (err) => {
                return cb(err)
            })
        }
    })
}

let checkIfExist = (path) => {
    for (var i = 0; i < store.files.length; i++) {
        if (store.files[i].path == path)
        {
            return true
        }
    }

    return false
}

let getFileRealInfo = (file, index, cb) => {
    let url;

    if (file.datas.type == 'series') {
        url = `https://api.themoviedb.org/3/search/tv?api_key=${store.tmdb_api_key}&language=${store.lang}&query=${file.datas.name}&page=1&include_adult=true`;
    }
    else {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${store.tmdb_api_key}&language=${store.lang}&query=${file.datas.name}${file.year ? `&year=${file.year}` : ``}&page=1&include_adult=true`;
    }
    axios.get(url)
    .then(resp => {
        console.log(resp)

        store.files[index].rename = store.files[index].rename.concat(resp.data.results)
        
        return cb()
    })
    .catch(err => {
        console.log(err)
        return cb()
    })
}