import React, { Component } from 'react'
import { observer } from 'mobx-react'

import store from '../tools/store'
import utils from '../tools/utils'

@observer
class Selected extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startName: this.props.file.title[0]
        }
    }

    componentDidMount() {
        console.log((this.props.file));
        
        this.setState({
            startName: this.props.file.title[0]
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
                    {utils.wordLetterUppercase(this.props.file.title[0])} {this.props.file.year ? <span className='year'>({this.props.file.year})</span> : ''}
                </div>

                <div className='editpart'>
                    <div className='editname'>
                        <select onChange={this.changeStartName.bind(this)}>
                            {this.props.file.rename.map((elem, ind) => {
                                console.log(JSON.parse(JSON.stringify(elem, null, 2)));
                                
                                return (
                                    <option key={elem.id} value={ind}>{elem.original_title || elem.title}</option>
                                )
                            })}
                        </select>
                        <input type="text" onChange={this.changeStartName.bind(this)} value={utils.wordLetterUppercase(this.state.startName)} />
                    </div>
                </div>
                
            </div>

        )
    }
}

export default Selected