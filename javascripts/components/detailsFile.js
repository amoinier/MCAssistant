import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedical, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { observer } from 'mobx-react'
import fs from 'fs'
import async from 'async'

import store from '../tools/store'
import utils from '../tools/utils'

@observer
class DetailsFile extends Component {
    componentWillMount() {
    }

    render() {
        return (
            <div className={'detailsFile' + (store.clicked_index === this.props.index ? ' detailsclicked' : '')} onClick={this.props.onClick}>
                <div className="infos">
                    <div className='title'>
                        {utils.wordLetterUppercase(this.props.elem.title[1] || this.props.elem.title[0])} {this.props.elem.year ? <span className='year'>({this.props.elem.year[0]})</span> : ''}
                    </div>

                    <div className="seriesinfo">
                        {this.props.elem.type == 'series' ? `S${utils.twoDigitNumber(this.props.elem.season)} E${utils.twoDigitNumber(this.props.elem.episode[0])}` : ''}
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
                            {this.props.elem.type == 'series' ? `S${utils.twoDigitNumber(this.props.elem.season)} E${utils.twoDigitNumber(this.props.elem.episode[0])}` : ''}
                        </div>
                    
                        <div className='filename'>
                            {this.props.elem.type == 'series' ? 
                                `${this.props.elem.rename[0].title || this.props.elem.rename[0].name} - S${utils.twoDigitNumber(this.props.elem.season)} E${utils.twoDigitNumber(this.props.elem.episode[0])}${utils.getFileExtension(this.props.elem.path)}`
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