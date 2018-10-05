import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileMedical } from '@fortawesome/free-solid-svg-icons'
import ReactDropzone from "react-dropzone";

class DragDrop extends Component {
    componentWillMount() {
    }

    onDrop(files) {
        console.log(files);
    }

    render() {
        return (
            <div className='dragdrop'>
                <ReactDropzone className='blockdrag' onDrop={this.onDrop}>
                    <div className='logo'>
                        <FontAwesomeIcon icon={faFileMedical} />
                    </div>
                    <div>
                        Choose a file or drag it here.
                    </div>
                </ReactDropzone>
            </div>
        )
    }
}

export default DragDrop
