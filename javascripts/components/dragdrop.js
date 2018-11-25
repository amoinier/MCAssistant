import React, { Component } from 'react'
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
                    let parsed = prepareParsedObj(elem.path)
                    store.addFile(parsed)                    
                    getFileRealInfo(parsed, store.files.length - 1, () => {})
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
                        let parsed = prepareParsedObj(`${folder}/${elem}`)
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

let prepareParsedObj = (path) => {
    let parsed = ptn(utils.pathToFilename(path))
    let datas = parseVideo(utils.pathToFilename(path))

    parsed.type = datas.type
    parsed.year = (!parsed.year ? [datas.year] : (parsed.year != datas.year ? [parsed.year, datas.year] : [parsed.year]))
    parsed.title = [parsed.title, datas.name].map(el => {return el ? utils.delFileExtenstion(el).normalize('NFD').replace(/[\u0300-\u036f]/g, "") : ''}).filter(Boolean)
    parsed.path = path
    parsed.season = datas.season
    parsed.episode = datas.episode
    parsed.rename = [];
    ['resolution', 'quality', 'group', 'excess', 'audio', 'codec'].map(e => delete parsed[e])

    if (parsed.length == 2 && parsed.title[0].replace(/\s/gmi, '').toLowerCase() == parsed.title[1].replace(/\s/gmi, '').toLowerCase()) {
        parsed.title = [parsed.title[0]]
    }
    parsed.proposals = utils.getAllProposalNames(parsed.title[0])

    return parsed
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
    async.eachOfLimit(file.proposals, 3, (tit, tkey, tcb) => {
        async.eachOfLimit(file.year, 3, (yea, ykey, ycb) => {
            let url

            if (file.type == 'series') {
                url = `https://api.themoviedb.org/3/search/tv?api_key=${store.tmdb_api_key}&language=${store.lang}&query=${tit}&page=1&include_adult=true`;
            }
            else {
                url = `https://api.themoviedb.org/3/search/movie?api_key=${store.tmdb_api_key}&language=${store.lang}&query=${tit}${yea ? `&primary_release_year=${yea}` : ``}&page=1&include_adult=true`;
            }
            axios.get(url)
            .then(resp => {
                store.files[index].rename = store.files[index].rename.concat(resp.data.results)
                
                return ycb()
            })
            .catch(err => {
                return ycb(err)
            })
        }, (err) => {
            return tcb(err)
        })
    }, (err) => {
        return cb(err)
    })
}