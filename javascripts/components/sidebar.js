import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faCog, faTv } from '@fortawesome/free-solid-svg-icons'

import '../../less/sidebar.less'

import Settings from '../pages/settings'
import Renamer from '../pages/renamer'
import store from '../tools/store';

let Icon = (props) => {
    return (
        <div style={props.style} onClick={props.onClick}>
            <div className={`icons ${props.className}`}>
                <FontAwesomeIcon icon={props.icon} style={{width: '30px', height: '30px'}} />
            </div>
            <div className={`title ${props.className}`}>
                <span>{props.title}</span>
            </div>
        </div>
    )
}

@observer
class Sidebar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selected_icon: 1
        }
    }

    changeChargedComponent(component, indexIcon, type) {
        store.charged_component = component
        store.charged_type = type || null

        this.setState({
            selected_icon: indexIcon
        })
    }

    render() {
        return (
            <div className='sidebar'>
                <Icon title='Movies' icon={faFilm} className={this.state.selected_icon == 1 ? 'selected' : ''} onClick={() => {this.changeChargedComponent(<Renamer key='1' />, 1, 'movies')}} />
                <Icon title='TV shows' icon={faTv} className={this.state.selected_icon == 2 ? 'selected' : ''} onClick={() => {this.changeChargedComponent(<Renamer key='2' />, 2, 'shows')}} />
                <Icon title='Settings' icon={faCog} className={this.state.selected_icon == 10 ? 'selected' : ''} style={{gridRow: -2}} onClick={() => {this.changeChargedComponent(<Settings />, 10)}} />
            </div>
        )
    }
}

export default Sidebar