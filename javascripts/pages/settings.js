import React, { Component } from 'react'
import { observer } from 'mobx-react'

import '../../less/settings.less'

import store from '../tools/store.js';
import langs from '../tools/langs.js';

let Setting = (props) => {
    return (
        <div className='settingblock'>
                <div className='title'>
                    {props.title} :
                </div>

                <div className='content'>
                    {props.children}
                </div>
            </div>
    )
}


@observer
class Settings extends Component {

    changeData(e) {
        store.settings[e.target.dataset.field] = e.target.value
        store.writeConfig()
    }
    

    render() {
        return (
            <div className='main settings'>
                <div className='header'>
                    <div className='title'>
                        Settings
                    </div>
                </div>
                <div className='body'>

                    <Setting title='Language'>
                        <select value={store.settings.lang} data-field='lang' onChange={this.changeData.bind(this)}>
                            {langs.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())).map((elem) => {
                                if (!elem.name)
                                    return null
                                return (
                                    <option key={elem.iso_639_1} value={elem.iso_639_1}>{elem.name}</option>
                                )
                            })}
                        </select>
                    </Setting>

                    <Setting title='TMDB API key'>
                        <input type="text" value={store.settings.tmdb_api_key} data-field='tmdb_api_key' onChange={this.changeData.bind(this)} />
                    </Setting>

                </div>
            </div>
        )
    }
}

export default Settings

