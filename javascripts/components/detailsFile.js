import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedical, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import ReactDropzone from "react-dropzone"
import { observer } from 'mobx-react'
import ptn from 'parse-torrent-name'
import fs from 'fs'
import async from 'async'

import store from '../tools/store'
import utils from '../tools/utils'

@observer
class DetailsFile extends Component {
    componentWillMount() {
    }

    render() {
        console.log(this.props.elem.datas);
        
        return (
            <div className='detailsFile'>
                <div className="infos">
                    <div className='title'>
                        {utils.wordLetterUppercase(this.props.elem.datas.name)} {this.props.elem.year ? <span className='year'>({this.props.elem.year})</span> : ''}
                    </div>

                    <div className="seriesinfo">
                        {this.props.elem.datas.type == 'series' ? `S${utils.twoDigitNumber(this.props.elem.datas.season)} E${utils.twoDigitNumber(this.props.elem.datas.episode[0])}` : ''}
                    </div>
                    
                    <div className='filename'>
                        {utils.pathToFilename(this.props.elem.path)}
                    </div>
                </div>

                <div className='arrowleft'>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>

                {this.props.elem.rename.length == 0 ?
                    <div className='newinfos'>
                        ...
                    </div>
                    :
                    <div className='newinfos'>
                        <div className='title'>
                            {this.props.elem.rename[0].title || this.props.elem.rename[0].name} {this.props.elem.rename[0].release_date ? <span className='year'>({this.props.elem.rename[0].release_date.substr(0, 4)})</span> : ''}
                        </div>

                        <div className="seriesinfo">
                            {this.props.elem.datas.type == 'series' ? `S${utils.twoDigitNumber(this.props.elem.datas.season)} E${utils.twoDigitNumber(this.props.elem.datas.episode[0])}` : ''}
                        </div>
                    
                        <div className='filename'>
                            {this.props.elem.datas.type == 'series' ? 
                                `${this.props.elem.rename[0].title || this.props.elem.rename[0].name} - S${utils.twoDigitNumber(this.props.elem.datas.season)} E${utils.twoDigitNumber(this.props.elem.datas.episode[0])}${utils.getFileExtension(this.props.elem.path)}`
                            :
                                `${this.props.elem.rename[0].title || this.props.elem.rename[0].name} (${this.props.elem.rename[0].release_date ? (this.props.elem.rename[0].release_date.substr(0, 4)) : ''})${utils.getFileExtension(this.props.elem.path)}`
                            }
                        </div>
                    </div>
                    
                }

            </div>
        )
    }
}

export default DetailsFile