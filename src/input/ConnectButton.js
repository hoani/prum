import React from 'react';
import IconButton from '../input/IconButton';

import { connect } from 'react-redux';
import { connected } from '../state/reducer';

class ConnectButton extends React.PureComponent {
    static defaultProps = {
        iconType:"feather",
        title:"Connect Wifi",
        isConnected: false,
        onPressConnect:()=>{},
        onPressDisconnect:()=>{},
    };

    render() {
        let {iconType, title, style, isConnected} = this.props;
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
