import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextField, Checkbox, IconButton } from 'material-ui';
import muiThemeable from 'material-ui/styles/muiThemeable';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import compose from 'recompose/compose';
import { TextInput } from 'admin-on-rest/lib/mui';
const plugins = [
    {
        url: 'phonegap-plugin-barcodescanner',
        name: 'phonegap-plugin-barcodescanner(条码/二维码扫描)',
    },
    {
        url: 'cordova-plugin-geolocation-baidu?API_KEY=tsIG8xQr1r3kuHIfcFOfGfGgWaNkXURv',
        name: 'cordova-plugin-geolocation-baidu(百度地图定位)',
        platform: 'ios'
        // hasArgs: true
    },
    {
        url: 'cordova-plugin-geoloaction-baidu-android?API_KEY=4z5k9DG1QUIBWF9yEfb4Qho6',
        name: 'cordova-plugin-geoloaction-baidu-android(百度地图定位)',
        platform: 'android'
        // hasArgs: true
    },
    {
        url: 'phonegap-nfc',
        name: 'phonegap-nfc(NFC读写)',
        platform: 'android'
    }
];
const getPlatform = (url) => {
    var plugin = plugins.find(v => v && v.url == url);
    if (plugin) {
        return plugin.platform;
    }
    return undefined;
}
const getStyles = ({ palette: { accent1Color } }) => ({
    removeButtonHovered: {
        opacity: 1,
    },
    removeIcon: {
        color: accent1Color,
    },
});
class PluginComponent extends PureComponent {
    hasPlugin = (url) => {
        const { input: { value } } = this.props;
        console.log(value);
        const result = !value ? undefined : value.find((item) => {
            return item && item.url == url;
        });
        return result != undefined;
    }
    handleCheck = (event, isChecked) => {
        const { input: { value, onChange } } = this.props;
        const url = event.target.value;
        const platform = getPlatform(url);
        if (isChecked) {
            onChange([...value, ...[{ url: url, platform: platform }]]);
        } else {
            onChange(value.filter(v => v && v.url != url && plugins.findIndex(item => item && item.url == v.url) != -1));
        }
    }
    renderPlatForm = (platform) => {
        return plugins.map((item, index) => {
            return item.platform != platform ? null : (
                <p>
                    <Checkbox key={item.url + "_" + index}
                        label={item.name}
                        value={item.url}
                        checked={this.hasPlugin(item.url)}
                        onCheck={this.handleCheck}
                    />
                    {!item.hasArgs ? null : <TextField></TextField>}
                </p>)
        })
    }
    // onRemove = () => {

    // }
    renderCustomPlugins = () => {
        // const { input: { value }, muiTheme } = this.props;
        // if (!value) {
            return null;
        // }
        // const styles = getStyles(muiTheme);
        // const data = value.filter(v => v && plugins.findIndex(item => item && item.url == v.url) == -1);
        // <TextField></TextField>
        // <IconButton onClick={this.onRemove}>
        //     <RemoveCircle
        //         style={styles.removeIcon}
        //         color={muiTheme.palette.accent1Color}
        //     />
        // </IconButton>
    }
    render() {
        return (
            <div>
                <p>
                    <div>通用插件</div>
                    {
                        this.renderPlatForm()
                    }
                </p>
                <p>
                    <div>Android插件</div>
                    {
                        this.renderPlatForm('android')
                    }
                </p>
                <p>
                    <div>IOS插件</div>
                    {
                        this.renderPlatForm('ios')
                    }
                </p>
                <p>
                    {
                        this.renderCustomPlugins()
                    }
                    {/* <TextInput  /> */}
                </p>
            </div>
        );
    }
}

PluginComponent.propTypes = {
    source: PropTypes.string,
    input: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
    }),
};

PluginComponent.defaultProps = {
    addField: true
};

const enhance = compose(muiThemeable());

const PluginInput = enhance(PluginComponent);
PluginInput.propTypes = {
    addField: PropTypes.bool.isRequired,
};

PluginInput.defaultProps = {
    addField: true,
};

export default PluginInput;
