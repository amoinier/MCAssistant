import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedical } from '@fortawesome/free-solid-svg-icons'
import ReactDropzone from "react-dropzone"
import { observer } from 'mobx-react'
import ptn from 'parse-torrent-name'
import fs from 'fs'
import async from 'async'

import store from '../tools/store'

@observer
class DetailsFile extends Component {
    componentWillMount() {
    }

    render() {
        console.log(this.props.info.datas);
        
        return (
            <div className='detailsFile'>
                <div className="infos">
                    <div className='title'>
                        {this.props.info.title}
                    </div>
                    <div className='year'>
                        {this.props.info.year}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default DetailsFile