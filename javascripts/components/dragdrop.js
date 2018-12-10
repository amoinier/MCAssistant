import React, { Component } from 'react'
import ReactDropzone from "react-dropzone"
import { observer } from 'mobx-react'
import ptn from 'parse-torrent-name'
import fs from 'fs'
import async from 'async'
import parseVideo from 'video-name-parser'
import uuidv4 from 'uuid/v4'

import store from '../tools/store'
import utils from '../tools/utils'

@observer
class DragDrop extends Component {
    componentWillMount() {
        store.resetFiles()
    }

    onDrop(files) {
        async.eachOfLimit(files, 5, (elem, index, each_cb) => {
            if (fs.existsSync(elem.path)) {
                if (fs.lstatSync(elem.path).isDirectory()) {
                    recursiveFolderContent(elem.path, err => {
                        return each_cb(err)                
                    })
                }
                else {
                    if (!checkPathFile(elem.path)) {
                        let index
                        let parsed = prepareParsedObj(elem.path)
                        store.addFile(parsed)
                        index = utils.findElemByUuid(parsed.uuid, store.files)
                        utils.getFileRealInfo(parsed, {tmdb_api_key: store.tmdb_api_key, lang: store.lang}, (err, renames) => {
                            store.files[index].rename = renames
                            store.files[index].selected_index = 0
                            return each_cb(err)                
                        })
                    }

                }
            }
        }, (err) => {
            return err
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
            return cb()
        }
        else {
            async.eachOfLimit(files, 3, (elem, index, each_cb) => {
                if (!fs.lstatSync(`${folder}/${elem}`).isSymbolicLink() && !fs.lstatSync(`${folder}/${elem}`).isDirectory()) {
                    if (!checkPathFile(`${folder}/${elem}`)) {
                        let index
                        let parsed = prepareParsedObj(`${folder}/${elem}`)
                        store.addFile(parsed)
                        index = utils.findElemByUuid(parsed.uuid, store.files)
                        utils.getFileRealInfo(parsed, {tmdb_api_key: store.tmdb_api_key, lang: store.lang}, (err, renames) => {
                            store.files[index].rename = renames
                            store.files[index].selected_index = 0
                        })
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

let prepareParsedObj = (path) => {
    let parsed = ptn(utils.pathToFilename(path))
    let datas = parseVideo(utils.pathToFilename(path))

    parsed.uuid = uuidv4()
    parsed.ref = React.createRef()
    parsed.type = datas.type
    parsed.year = (!parsed.year ? [datas.year] : (parsed.year != datas.year ? [parsed.year, datas.year] : [parsed.year]))
    parsed.title = [parsed.title, datas.name].map(el => {return el ? utils.delFileExtenstion(el).normalize('NFD').replace(/[\u0300-\u036f]/g, "") : ''}).filter(Boolean).sort((a, b) => b.length - a.length)
    parsed.path = path
    parsed.season = datas.season
    parsed.episode = datas.episode
    parsed.rename = []
    parsed.selected_index = -1;
    ['resolution', 'quality', 'group', 'excess', 'audio', 'codec'].map(e => delete parsed[e])

    if (parsed.length == 2 && parsed.title[0].replace(/\s/gmi, '').toLowerCase() == parsed.title[1].replace(/\s/gmi, '').toLowerCase()) {
        parsed.title = [parsed.title[0]]
    }
    parsed.proposals = utils.getAllProposalNames(parsed.title[0])

    return parsed
}

let checkPathFile = (path) => {
    if (utils.listExtensions().indexOf(utils.getFileExtension(path)) == -1) {
        return true
    }

    for (var i = 0; i < store.files.length; i++) {
        if (store.files[i].path == path)
        {
            return true
        }
    }

    return false
}