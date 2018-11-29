import React , { PureComponent } from 'react';

export default class ImagePreview extends PureComponent{
    render(){
        return (<img src={this.props.record.url} />);
    }
}