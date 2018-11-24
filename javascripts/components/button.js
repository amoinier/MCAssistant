import React, { Component } from 'react'
import { observer } from 'mobx-react'

import store from '../tools/store'

import DetailsFile from './detailsFile'

@observer
class Button extends Component {
    componentWillMount() {
    }

    render() {
        return (
            <div className='button'>
                <button>
                    Save
                </button>
            </div>

        )
    }
}

export default Button