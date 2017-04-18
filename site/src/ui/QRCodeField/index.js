import React, { PropTypes, PureComponent } from 'react';
import get from 'lodash.get';
import qrcode from 'qrcode';

export default class QRCodeField extends PureComponent {
    componentDidMount() {
        qrcode.toCanvas(this.canvas, this.props.text(this.props.record), function (error) {
            if (error) console.error(error)
            console.log('success!');
        })
    }
    render() {
        const { source, record = {}, elStyle } = this.props;
        return (
            <canvas ref={(canvas) => { this.canvas = canvas; }} >
            </canvas>
        )
    }
}


