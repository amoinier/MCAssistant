import React, { Component } from 'react'
import { observer } from 'mobx-react'

import store from '../tools/store'

import DetailsFile from './detailsFile'

@observer
class Details extends Component {
    componentWillMount() {
    }

    fileClick(index) {
        store.clicked_index = index;
    }

    render() {
        return (
            <div className='details'>
                {store.files.map((elem, index) => {
                    return (<DetailsFile elem={elem} key={index} index={index} onClick={(e) => {this.fileClick(index)}} />)
                })}
            </div>

        )
    }
}

export default Details