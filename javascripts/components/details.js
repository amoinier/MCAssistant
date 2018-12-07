import React, { Component } from 'react'
import ReactDOM from 'react-dom'
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

    onKeyPressed(e) {
        if (e.key == 'Delete') {
            store.deleteFiles(store.clicked_index)
            store.clicked_index = store.files.length > store.clicked_index && store.files[store.clicked_index] ? store.clicked_index : -1
            if (store.clicked_index >= 0 && store.files[store.clicked_index].ref) {
                ReactDOM.findDOMNode(store.files[store.clicked_index].ref.current).focus()
            }
        }
    }

    render() {
        return (
            <div className='details' onKeyDown={(e) => this.onKeyPressed(e)}>
                {store.files.map((elem, index) => {
                    return (<DetailsFile elem={elem} ref={elem.ref} key={elem.uuid} index={index} onClick={(e) => {this.fileClick(index)}} />)
                })}
            </div>
        )
    }
}

export default Details