import React, { PropTypes , PureComponent } from 'react';
import get from 'lodash.get';
var style = {
    height: '80px',
    lineHeight: '80px',
    width: '100%',
    textDecoration: 'none',
    display: 'block',
    backgroundColor: '#3475B7',
    color: '#ffffff',
    fontSize: '2em',
    borderRadius: '2px',
    textAlign: 'center',
    verticalAlign: 'middle'
};
export default class IOSInstallLink extends PureComponent{
    onClick=(e)=>{
        e.stopPropagation();
    }
    render(){
        const { source, record = {}, elStyle } = this.props;
        return (
            <a onClick={this.onClick} href={ 'itms-services://?action=download-manifest&amp;url=' + get(record, source)} style={style}>
                { this.props.buttonLabel}
            </a>
        )
    }
}

