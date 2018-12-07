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
            <div className={`button ${this.props.buttclass}`}>
                <button onClick={this.props.click.bind(this)}>
                    {this.props.text}
                </button>
            </div>

        )
    }
}

export default Button