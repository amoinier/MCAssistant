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
        <div className='icons' style={props.style} onClick={props.onClick}>
            <FontAwesomeIcon icon={props.icon} />
        </div>
    )
}

@observer
class Sidebar extends Component {

    changeChargedComponent(component) {
        store.charged_component = component
    }

    render() {
        return (
            <div className='sidebar'>
                <Icon icon={faFile} onClick={() => {this.changeChargedComponent(<Renamer />)}} />
                <Icon icon={faCog} style={{gridRow: -2}} onClick={() => {this.changeChargedComponent(<Settings />)}} />
            </div>
        )
    }
}

export default Sidebar