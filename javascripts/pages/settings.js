import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedical } from '@fortawesome/free-solid-svg-icons'
import fs from 'fs'
import async from 'async'

import '../../less/settings.less'

import store from '../tools/store.js';
import utils from '../tools/utils.js';


@observer
class Settings extends Component {

    render() {
        return (
            <div className='main settings'>
                <div className='header'>
                    <div className='title'>
                        Settings
                    </div>
                </div>
                <div className='body'>
                    Settings
                </div>
                <div className='footer'>
                    Settings
                </div>
            </div>
        )
    }
}

export default Settings

