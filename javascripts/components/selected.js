import React, { Component } from 'react'
import { observer } from 'mobx-react'

import store from '../tools/store'
import utils from '../tools/utils'

@observer
class Selected extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startName: ''
        }
    }

    componentDidMount() {
        this.setState({
            startName: this.props.file.datas.name
        })
    }

    changeStartName(e) {
        this.setState({
            startName: e.target.value
        })
        
    }

    render() {
        return (
            <div className='selected'>
                <div className='title'>
                    {utils.wordLetterUppercase(this.props.file.datas.name)} {this.props.file.year ? <span className='year'>({this.props.file.year})</span> : ''}
                </div>

                <div className='editpart'>
                    <div className='editname'>
                        <select onChange={this.changeStartName.bind(this)}>
                            <option value='test'>test</option>
                            <option value='test2'>test2</option>
                        </select>
                        <input type="text" onChange={this.changeStartName.bind(this)} value={utils.wordLetterUppercase(this.state.startName)} />
                    </div>
                </div>
                
            </div>

        )
    }
}

export default Selected