import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedical } from '@fortawesome/free-solid-svg-icons'

import DragDrop from './components/dragdrop.js'

import '../less/main.less'

class Index extends Component {
    componentWillMount() {
    }

    render() {
        return (
            <div className='main'>
                <div className='header'>

                </div>
                <div className='body'>
                    <DragDrop />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('content'))
