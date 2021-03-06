import React from 'react';
import IconButton from '../input/iconButton';

import { connect } from 'react-redux';

class ConnectButton extends React.PureComponent {
    static defaultProps = {
        disabled: true,
        iconType:"feather",
        title:"Connect Wifi",
        isConnected: false,
        onPressConnect:()=>{},
        onPressDisconnect:()=>{},
    };

    render() {
        let {iconType, title, style, isConnected, disabled} = this.props;
        let iconName = "wifi";

        if (isConnected) {
            title = title.replace("Connect", "Disconnect");
            iconName = "wifi-off";
        }
        else {
            title = title.replace("Disconnect", "Connect");
        }

        let onPress = () => {
            let { isConnected, onPressDisconnect, onPressConnect } = this.props;

            if (isConnected) {
                onPressDisconnect();
            }
            else {
                onPressConnect();
            }
        };
        return (
            <>
                <IconButton
                    iconName = {iconName}
                    iconType = {iconType}
                    title = {title}
                    onPress = {onPress}
                    style = {style}
                    disabled={this.props.disabled}
                  />
            </>
        );
    }
}
const mapStateToProps = (state) => {
    let isConnected = state.connect.isConnected;
    return {
        isConnected,
    };
};



export default connect(mapStateToProps)(ConnectButton);
