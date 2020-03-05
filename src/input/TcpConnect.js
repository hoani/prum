import React from 'react';
import {
  TextInput,
  View,
  Text,
} from 'react-native';

import { styles} from "../style/style";

import {input} from "../state/reducer"

import ConnectButton from './connectButton';

import { connect } from 'react-redux';

class TcpConnect extends React.PureComponent {
  render() {
    let {address, client} = this.props;
    let disabled = false;

    let reTcpIp = /^(\d{1,3}\.){3}\d{1,3}$/;

    if (reTcpIp.test(address) == false) {
      disabled = true;
    }

    return (
      <>
        <Text style={styles.sectionDescription}>
          Connect Wifi
        </Text>
        <TextInput
          style={styles.textInput}
          defaultValue={address}
          onChangeText={
            (value) => {
              this.props.input("tcp/address", value);
            }
          }
        />
        <View style = {{paddingTop: 12}}>
          <ConnectButton
            disabled = {disabled}
            style={{paddingTop:12}}
            title="Connect Wifi"
            onPressConnect={() => {
              client.connect({ host: address});

            }}
            onPressDisconnect={() => {
              client.disconnect();
            }}
          />
        </View>
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  if ("tcp/address" in state.input) {
    if (state.input["tcp/address"] != ownProps.address) {
      return {
        address: state.input["tcp/address"],
      };
    }
  }
  return {};
};

const mapDispatchToProps = {
  input
};

const ConnectedTcpConnect = connect(mapStateToProps, mapDispatchToProps)(TcpConnect);

ConnectedTcpConnect.defaultProps = {
  address:'192.168.1.13',
  client: null
};

export default ConnectedTcpConnect;
