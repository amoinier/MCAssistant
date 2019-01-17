import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import store from '../tools/store'
import utils from '../tools/utils'
import Button from './button.js'

@observer
class Selected extends Component {

    constructor(props) {
        super(props)

        this.state = {
            rename: this.props.file.rename,
            searchName: this.props.file.titles[0],
            selected_index: 0,
        }
    }

    componentDidMount() {
        this.setState({
            rename: this.props.file.rename,
            searchName: this.props.file.titles[0],
            selected_index: 0,
        })        
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps

        if (this.props.file) {
            this.setState({
                rename: this.props.file.rename,
                searchName: this.props.file.titles[0],
                selected_index: 0,
            })
        }
    }

    changeStartName(e) {
        this.setState({
            searchName: e.target.value,
        })
        
    }

    selectOther(e) {
        this.setState({
            selected_index: e.target.value,
        })

        store.files[store.clicked_index].selected_index = e.target.value
    }

    searchNewTitle(e) {
        e.preventDefault()
        
        this.props.file.proposals = utils.getAllProposalNames(this.state.searchName)
        store.files[store.clicked_index].proposals = utils.getAllProposalNames(this.state.searchName)

        utils.getFileRealInfo(this.props.file, {tmdb_api_key: store.settings.tmdb_api_key, lang: store.settings.lang, providers: store.settings.providers, use_year: false, type: store.charged_type}, (err, renames) => {
            if (err || renames.length == 0) {
                this.setState({
                    searchName: '',
                })
            }
            else {
                this.props.file.rename = renames
                this.props.file.selected_index = renames.length > 0 ? 0 : -1
                store.files[store.clicked_index].rename = renames
                store.files[store.clicked_index].selected_index = renames.length > 0 ? 0 : -1

                this.setState({
                    rename: renames,
                    selected_index: 0,
                })
            }
        })
    }

    handleKeyPress(e) {
        if (e.key == 'Enter') {
            this.searchNewTitle(e)
        }
    }

    editNumber(e) {
        this.props.file[e.target.name] = e.target.value
    }

    render() {
        return (
            <div className='selected'>
                <div className='title'>
                    {utils.wordLetterUppercase(this.props.file.titles[0])} {this.props.file.years > 0 && this.props.file.years[0] ? <span className='year'>({this.props.file.years[0]})</span> : ''}
                </div>

                <div className='editpart'>
                    <div className='editname'>
                        <select onChange={this.selectOther.bind(this)} value={this.state.selected_index}>
                            {this.state.rename.map((elem, ind) => {
                                return (
                                    <option key={ind} value={ind}>{elem.title || elem.name}</option>
                                )
                            })}
                        </select>
                        <div className='edittitle'>
                        <input type="text" onChange={this.changeStartName.bind(this)} value={utils.wordLetterUppercase(this.state.searchName) || ''} onKeyPress={this.handleKeyPress.bind(this)} />
                            <Button text='Search' click={this.searchNewTitle.bind(this)} buttclass='search' />
                        </div>
                    </div>

                    <div className='arrowleft'>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>

                    {this.state.selected_index == -1 || this.state.rename.length == 0 ?
                        <div className='editnewinfos'>
                            ...
                        </div>
                        :
                        <div className='editnewinfos'>
                            <div className='title'>
                                {this.state.rename[this.state.selected_index].title || this.state.rename[this.state.selected_index].name} {this.state.rename[this.state.selected_index].release_date || this.state.rename[this.state.selected_index].first_air_date ? <span className='year'>({(this.state.rename[this.state.selected_index].release_date || this.state.rename[this.state.selected_index].first_air_date).substr(0, 4)})</span> : ''}
                            </div>

                            <div className="seriesinfo">
                                {store.charged_type === 'shows' ? <div>S<input value={utils.twoDigitNumber(this.props.file.season)} name='season' onChange={this.editNumber.bind(this)} /> E<input value={utils.twoDigitNumber(this.props.file.episode)} name='episode' onChange={this.editNumber.bind(this)} /></div> : ''}
                            </div>
                        
                            <div className='filename'>
                            {store.charged_type === 'shows' ? 
                                `${this.state.rename[this.state.selected_index].title || this.state.rename[this.state.selected_index].name} (${this.state.rename[this.state.selected_index].first_air_date ? (this.state.rename[this.state.selected_index].first_air_date.substr(0, 4)) : ''}) - S${utils.twoDigitNumber(this.props.file.season)} E${utils.twoDigitNumber(this.props.file.episode)}${utils.getFileExtension(this.props.file.path)}`
                            :
                                `${this.state.rename[this.state.selected_index].title || this.state.rename[this.state.selected_index].name} (${this.state.rename[this.state.selected_index].release_date ? (this.state.rename[this.state.selected_index].release_date.substr(0, 4)) : ''})${utils.getFileExtension(this.props.file.path)}`
                            }
                            </div>
                        </div>
                        
                    }

                </div>
                
            </div>

        )
    }
}

export default Selected