import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedical } from '@fortawesome/free-solid-svg-icons'

import '../less/main.less'

import store from './tools/store.js';

import DragDrop from './components/dragdrop.js'
import Details from './components/details.js'
import Selected from './components/selected.js'
import Button from './components/button.js'

@observer
class Index extends Component {
    componentWillMount() {
    }

    render() {
        return (
            <div className='main'>
                <div className='header'>
                    {store.clicked_index < 0 ? ''
                    :
                        <Selected file={store.files[store.clicked_index]} />
                    }
                </div>
                <div className='body'>
                    <DragDrop>
                        {store.files.length == 0 ?
                            <div>
                                <div className='logo'>
                                    <FontAwesomeIcon icon={faFileMedical} />
                                </div>
                                <div>
                                    Choose a file or drag it here.
                                </div>
                            </div>
                        :
                            <Details />
                        }
                    </DragDrop>
                </div>
                <div className='footer'>
                    <Button />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('content'))
