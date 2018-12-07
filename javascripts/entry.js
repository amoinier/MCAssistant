import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedical } from '@fortawesome/free-solid-svg-icons'
import fs from 'fs'
import async from 'async'

import '../less/main.less'

import store from './tools/store.js';
import utils from './tools/utils.js';

import DragDrop from './components/dragdrop.js'
import Details from './components/details.js'
import Selected from './components/selected.js'
import Button from './components/button.js'

@observer
class Index extends Component {

    saveNameFile() {
        let uuidToDelete = []
        store.clicked_index = -1
        
        async.eachOf(store.files, (elem, index, each_cb) => {
            if (elem && elem.path) {
                let newPath
                if (elem.type == 'series') {
                    newPath = elem.path.replace(utils.pathToFilename(elem.path), `${elem.selected.title || elem.selected.name} (${elem.selected.first_air_date ? (elem.selected.first_air_date.substr(0, 4)) : ''}) - S${utils.twoDigitNumber(elem.season)} E${utils.twoDigitNumber(elem.episode[0])}${utils.getFileExtension(elem.path)}`.replace(/:/gmi, ''))
                }
                else {
                    newPath = elem.path.replace(utils.pathToFilename(elem.path), `${elem.selected.title || elem.selected.name} (${elem.selected.release_date ? (elem.selected.release_date.substr(0, 4)) : ''})${utils.getFileExtension(elem.path)}`.replace(/:/gmi, ''))
                }
                if (!fs.existsSync(newPath)) {
                    fs.rename(elem.path, newPath, (err) => {
                        if (err) {
                            return each_cb(err)
                        }
                        else {
                            uuidToDelete.push(elem.uuid)
                            return each_cb()
                        }
                    })
                }
                else {
                    return each_cb()
                }
            }
            else {
                return each_cb()
            }
        }, (err) => {
            if (err) {

            }
            else {
                uuidToDelete.forEach(uuid => {
                    if (utils.findElemByUuid(uuid, store.files) || utils.findElemByUuid(uuid, store.files) >= 0) {
                        store.files.splice(utils.findElemByUuid(uuid, store.files), 1)
                    }
                })
                
            }
            return err
        })
    }

    render() {
        return (
            <div className='main'>
                <div className='header'>
                    {store.clicked_index < 0 ? ''
                    :
                        <Selected file={store.files[store.clicked_index]} />
                    }
                </div>
                <div className='body'>
                    <DragDrop>
                        {store.files.length == 0 ?
                            <div>
                                <div className='logo'>
                                    <FontAwesomeIcon icon={faFileMedical} />
                                </div>
                                <div>
                                    Choose a file or drag it here.
                                </div>
                            </div>
                        :
                            <Details />
                        }
                    </DragDrop>
                </div>
                <div className='footer'>
                    {store.files.length == 0 ? '' :
                    <Button text='Save' click={this.saveNameFile} buttclass='' />
                    }
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('content'))
