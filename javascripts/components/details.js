import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedical } from '@fortawesome/free-solid-svg-icons'
import { observer } from 'mobx-react'
import ptn from 'parse-torrent-name'
import fs from 'fs'
import async from 'async'
import parseVideo from 'video-name-parser'

import store from '../tools/store'

import DetailsFile from './detailsFile'

@observer
class Details extends Component {
    componentWillMount() {
    }

    onDrop(files) {
        files.forEach(elem => {
            if (fs.lstatSync(elem.path).isDirectory()) {
                recursiveFolderContent(elem.path, err => {

                })
            }
            else {
                let parsed = ptn(elem.path.substr(elem.path.lastIndexOf('/') + 1, elem.path.length))
                parsed.datas = parseVideo(elem.path.substr(elem.path.lastIndexOf('/') + 1, elem.path.length))
                parsed.path = elem.path
                store.addFile(parsed)

                console.log(parsed);
                
            }
        })  

    }

    render() {
        return (
            <div className='details'>
                {store.files.map((elem, index) => {
                    return (<DetailsFile info={elem} key={index} />)
                })}
            </div>

        )
    }
}

export default Details