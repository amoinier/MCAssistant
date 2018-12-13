import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faCog } from '@fortawesome/free-solid-svg-icons'

import '../../less/sidebar.less'

import Settings from '../pages/settings'
import Renamer from '../pages/renamer'
import store from '../tools/store';

let Icon = (props) => {
    return (
        <div className={`icons ${props.className}`} style={props.style} onClick={props.onClick}>
            <FontAwesomeIcon icon={props.icon} />
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

    changeChargedComponent(component, indexIcon) {
        store.charged_component = component

        this.setState({
            selected_icon: indexIcon
        })
    }

    render() {
        return (
            <div className='sidebar'>
                <Icon icon={faFile} className={this.state.selected_icon == 1 ? 'selected' : ''} onClick={() => {this.changeChargedComponent(<Renamer />, 1)}} />
                <Icon icon={faCog} className={this.state.selected_icon == 10 ? 'selected' : ''} style={{gridRow: -2}} onClick={() => {this.changeChargedComponent(<Settings />, 10)}} />
            </div>
        )
    }
}

export default Sidebar