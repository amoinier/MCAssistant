import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import store from '../tools/store'
import utils from '../tools/utils'
import Button from './button.js'
import Selected from './selected.js'

@observer
class Headbar extends Component {

    render() {
        return (
            <div className='selected'>
                <div className='headbar'>

                    <div className='settings-icon'>
                        <FontAwesomeIcon icon={faBars} />
                    </div>

                    <div className='title'>
                        {store.clicked_index >= 0 ? `${utils.wordLetterUppercase(store.files[store.clicked_index].title[0])} ${store.files[store.clicked_index].year > 0 && store.files[store.clicked_index].year[0] ? <span className='year'>({store.files[store.clicked_index].year[0]})</span> : ''}` : ''}
                    </div>
                </div>

                {store.clicked_index < 0 ?
                    <div></div>
                :
                    <Selected file={store.files[store.clicked_index]} />
                }

            </div>

        )
    }
}

export default Headbar