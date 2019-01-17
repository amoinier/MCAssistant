import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedical } from '@fortawesome/free-solid-svg-icons'
import fs from 'fs'
import async from 'async'

import '../less/main.less'
import '../less/button.less'

import store from './tools/store.js';
import utils from './tools/utils.js';

import Sidebar from './components/sidebar.js'
import Renamer from './pages/renamer.js'

@observer
class Index extends Component {

    componentWillMount() {
        store.charged_component = <Renamer />
        store.charged_type = 'movies'
        store.getConfigFile()
    }

    render() {
        return (
            <div className='page'>

                <Sidebar />
                
                {store.charged_component}
            </div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('content'))
