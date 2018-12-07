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
            searchName: this.props.file.title[0],
            selected: this.props.file.selected,
            selected_index: 0,
        }
    }

    componentDidMount() {
        this.setState({
            rename: this.props.file.rename,
            searchName: this.props.file.title[0],
            selected: this.props.file.selected,
            selected_index: 0,
        })        
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps

        this.setState({
            rename: this.props.file.rename,
            searchName: this.props.file.title[0],
            selected: this.props.file.selected,
            selected_index: 0,
        })
    }

    changeStartName(e) {
        this.setState({
            searchName: e.target.value,
        })
        
    }

    selectOther(e) {
        this.setState({
            selected: this.props.file.rename[e.target.value],
            selected_index: e.target.value,
        })

        store.files[store.clicked_index].selected = this.props.file.rename[e.target.value]
    }

    searchNewTitle(e) {
        e.preventDefault()
        
        this.props.file.proposals = utils.getAllProposalNames(this.state.searchName)
        store.files[store.clicked_index].proposals = utils.getAllProposalNames(this.state.searchName)

        utils.getFileRealInfo(this.props.file, {tmdb_api_key: store.tmdb_api_key, lang: store.lang, use_year: false}, (err, renames) => {
            this.props.file.rename = renames
            this.props.file.selected = renames[0]
            store.files[store.clicked_index].rename = renames
            store.files[store.clicked_index].selected = renames[0]

            this.setState({
                rename: renames,
                selected: renames[0],
                selected_index: 0,
            })
        })
    }

    handleKeyPress(e) {
        if (e.key == 'Enter') {
            this.searchNewTitle(e)
        }
    }

    render() {
        return (
            <div className='selected'>
                <div className='title'>
                    {utils.wordLetterUppercase(this.props.file.title[0])} {this.props.file.year ? <span className='year'>({this.props.file.year})</span> : ''}
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

                    {!this.state.selected ?
                        <div className='editnewinfos'>
                            ...
                        </div>
                        :
                        <div className='editnewinfos'>
                            <div className='title'>
                                {this.state.selected.title || this.state.selected.name} {this.state.selected.release_date || this.state.selected.first_air_date ? <span className='year'>({(this.state.selected.release_date || this.state.selected.first_air_date).substr(0, 4)})</span> : ''}
                            </div>

                            <div className="seriesinfo">
                                {this.props.file.type == 'series' ? `S${utils.twoDigitNumber(this.props.file.season)} E${utils.twoDigitNumber(this.props.file.episode[0])}` : ''}
                            </div>
                        
                            <div className='filename'>
                            {this.props.file.type == 'series' ? 
                                `${this.state.selected.title || this.state.selected.name} (${this.state.selected.first_air_date ? (this.state.selected.first_air_date.substr(0, 4)) : ''}) - S${utils.twoDigitNumber(this.props.file.season)} E${utils.twoDigitNumber(this.props.file.episode[0])}${utils.getFileExtension(this.props.file.path)}`
                            :
                                `${this.state.selected.title || this.state.selected.name} (${this.state.selected.release_date ? (this.state.selected.release_date.substr(0, 4)) : ''})${utils.getFileExtension(this.props.file.path)}`
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