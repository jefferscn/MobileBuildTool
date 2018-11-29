import React , { PureComponent } from 'react';

export default class FilePreview extends PureComponent{
    render(){
        return (<a href={this.props.record.url}>{this.props.record.filename}</a>);
    }
}