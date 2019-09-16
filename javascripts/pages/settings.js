import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faCog } from '@fortawesome/free-solid-svg-icons'

import '../../less/settings.less'

import store from '../tools/store.js';
import langs from '../tools/langs.js';
import providers from '../tools/providers.js';

let Setting = (props) => {
    return (
        <div className='settingblock'>
                <div className='title'>
                    {props.icon ? <FontAwesomeIcon icon={props.icon} /> : ''} {props.title}
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

        console.log(store.settings);
        console.log(e.target.dataset.field);
        console.log(e.target.value);
        
        
        if (e.target.dataset.field === 'shows' || e.target.dataset.field === 'movies')
            store.settings[e.target.dataset.field].path = e.target.value
        else
            store.settings[e.target.dataset.field] = e.target.value
        store.writeConfig()
    }
    
    changeProviders(e) {
        if (!e.target.checked) {
            if (store.settings.providers.indexOf(e.target.name) != -1)
                store.settings.providers.splice(store.settings.providers.indexOf(e.target.name), 1)
            }
        else {
            if (store.settings.providers.indexOf(e.target.name) == -1)
                store.settings.providers.push(e.target.name)
        }

        store.writeConfig()
    }

    changePoster(e) {
        store.settings[e.target.name].poster = e.target.checked     
        
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

                    <Setting title='General'  icon={faCog}>
                        <div className='block'>
                            <div className='subtitle'>Language</div>
                            <select value={store.settings.lang} data-field='lang' onChange={this.changeData.bind(this)}>
                                {langs.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())).map((elem) => {
                                    if (!elem.name)
                                        return null
                                    return (
                                        <option key={elem.iso_639_1} value={elem.iso_639_1}>{elem.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        
                        <div className='block'>
                            <div className='subtitle'>TMDB API key</div>
                            <input type='text' value={store.settings.tmdb_api_key} data-field='tmdb_api_key' onChange={this.changeData.bind(this)} />
                        </div>
                        
                    </Setting>

                    <Setting title='Renamer' icon={faFile}>
                        <div className='block'>
                            <div className='subtitle'>Providers</div>
                            {providers.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())).map((elem, index) => {
                                return (
                                    <span key={elem.name} style={{display: 'inline-grid', gridTemplateColumns: 'auto auto', alignItems: 'center'}}>
                                        <input type='checkbox' name={elem.name} defaultChecked={store.settings.providers.indexOf(elem.name) != -1 ? true : false} onChange={this.changeProviders.bind(this)}/>
                                        {elem.name}
                                    </span>
                                )
                            })}
                        </div>

                        <div className='block'>
                            <div className='subtitle'>File path</div>
                            <div className='subblock'>
                            <div className='subtitle'>Movies</div>
                                <input type='text' value={store.settings.movies.path} data-field='movies' onChange={this.changeData.bind(this)} />
                                <div className='desc'>Possible infos: :title: - :original_title: - :year:</div>
                                <span style={{display: 'inline-grid', gridTemplateColumns: 'auto auto', alignItems: 'center'}}>
                                    <input type='checkbox' name='movies' defaultChecked={store.settings.movies.poster} onChange={this.changePoster.bind(this)}/>
                                    Download poster
                                </span>
                            </div>
                            
                            <div className='subblock'>
                                <div className='subtitle'>TV shows</div>
                                <input type='text' value={store.settings.shows.path} data-field='shows' onChange={this.changeData.bind(this)} />
                                <div className='desc'>Possible infos: :title: - :original_title: - :year: - :season: - :episode:</div>
                                <span style={{display: 'inline-grid', gridTemplateColumns: 'auto auto', alignItems: 'center'}}>
                                    <input type='checkbox' name='shows' defaultChecked={store.settings.shows.poster} onChange={this.changePoster.bind(this)}/>
                                    Download poster
                                </span>
                            </div>
                        </div>
                    </Setting>

                </div>
            </div>
        )
    }
}

export default Settings

