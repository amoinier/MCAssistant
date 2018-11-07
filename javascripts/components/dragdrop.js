import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedical } from '@fortawesome/free-solid-svg-icons'
import ReactDropzone from "react-dropzone"
import { observer } from 'mobx-react'
import ptn from 'parse-torrent-name'
import fs from 'fs'
import async from 'async'
import parseVideo from 'video-name-parser'

import store from '../tools/store'

@observer
class DragDrop extends Component {
    componentWillMount() {
        store.resetFiles()
    }

    onDrop(files) {
        files.forEach(elem => {
            if (fs.lstatSync(elem.path).isDirectory()) {
                recursiveFolderContent(elem.path, err => {

                })
            }
            else {
                if (!checkIfExist(elem.path)) {
                    let parsed = ptn(elem.path.substr(elem.path.lastIndexOf('/') + 1, elem.path.length))
                    parsed.datas = parseVideo(elem.path.substr(elem.path.lastIndexOf('/') + 1, elem.path.length))
                    parsed.path = elem.path
                    store.addFile(parsed)
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
                        let parsed = ptn(`${folder}/${elem}`.substr(`${folder}/${elem}`.lastIndexOf('/') + 1, `${folder}/${elem}`.length))
                        parsed.datas = parseVideo(`${folder}/${elem}`.substr(`${folder}/${elem}`.lastIndexOf('/') + 1, `${folder}/${elem}`.length))
                        parsed.path = `${folder}/${elem}`
                        store.addFile(parsed)
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