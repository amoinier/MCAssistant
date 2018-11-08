import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedical } from '@fortawesome/free-solid-svg-icons'
import { observer } from 'mobx-react'
import ptn from 'parse-torrent-name'
import fs from 'fs'
import async from 'async'
import parseVideo from 'video-name-parser'

import store from '../tools/store'
import utils from '../tools/utils'

import DetailsFile from './detailsFile'

@observer
class Details extends Component {
    componentWillMount() {
    }

    render() {
        return (
            <div className='details'>
                {store.files.map((elem, index) => {
                    return (<DetailsFile elem={elem} key={index} />)
                })}
            </div>

        )
    }
}

export default Details