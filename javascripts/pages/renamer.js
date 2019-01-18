import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedical } from '@fortawesome/free-solid-svg-icons'
import fs from 'fs'
import async from 'async'
import mkdirp from 'mkdirp'
import axios from 'axios'

import '../../less/renamer.less'

import store from '../tools/store.js';
import utils from '../tools/utils.js';

import DragDrop from '../components/dragdrop.js'
import Details from '../components/details.js'
import Selected from '../components/selected.js'
import Button from '../components/button.js'

@observer
class Renamer extends Component {

    componentWillMount() {
        store.resetFiles()
        store.clicked_index = -1
    }

    saveNameFile() {
        let uuidToDelete = []
        store.clicked_index = -1
        
        async.eachOf(store.files, (elem, index, each_cb) => {
            if (elem && elem.path) {
                let newPath
                let rename = elem.rename[elem.selected_index]

                elem.year = rename.first_air_date ? (rename.first_air_date.substr(0, 4)) : (rename.release_date ? (rename.release_date.substr(0, 4)) : '')
                elem.original_title = rename.original_title || rename.original_name
                elem.title = rename.title || rename.name
                elem.episode = utils.twoDigitNumber(elem.episode)
                elem.season = utils.twoDigitNumber(elem.season)

                newPath = elem.path.replace(utils.pathToFilename(elem.path), utils.translatePath(store.settings[store.charged_type].path, elem))
                
                if (!fs.existsSync(newPath)) {
                    mkdirp(newPath.substr(0, newPath.lastIndexOf('/')), (err) => {
                        if (err && !fs.existsSync(newPath.substr(0, newPath.lastIndexOf('/')))) {
                            console.log('cant mkdir')
                            console.log(err);
                            
                            return each_cb(err)
                        }

                        utils.downloadImg(store.settings[store.charged_type].poster, newPath, rename, (err) => {
                            fs.rename(elem.path, newPath, (err) => {
                                if (err) {
                                    console.log('cant rename');
                                    
                                    console.log(err);
                                    
                                    return each_cb(err)
                                }
                                else {
                                    uuidToDelete.push(elem.uuid)
                                    return each_cb()
                                }
                            })
                        })
                    })
                }
                else {
                    console.log('already exists');
                    
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
            <div className='main renamer'>
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

export default Renamer

