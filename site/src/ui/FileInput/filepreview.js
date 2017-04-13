import React , { PureComponent } from 'react';

export default class FilePreview extends PureComponent{
    render(){
        return (<div>{this.props.record.filename}</div>);
    }
}