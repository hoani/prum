import React from 'react';
import {
  TextInput,
  View,
  Text,
} from 'react-native';

import { styles} from "../style/style";

import {input} from "../state/reducer"

import ConnectButton from '../input/ConnectButton';

import { connect } from 'react-redux';

class TcpConnect extends React.PureComponent {
  static defaultProps = {
    address:'192.168.1.13',
    client: null
  };

  render() {
    let {address, client} = this.props;
    console.log(address)

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
              input("tcp/address", value);
            }
          }
        />
        <View style = {{paddingTop: 12}}>
          <ConnectButton
            style={{paddingTop:12}}
            title="Connect Wifi"
            onPressConnect={() => {
              client.connect({localAddress: address});
              console.log(address)
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
const mapStateToProps = (state) => {
  console.log(state.input) 
  if ("tcp/address" in state.input) {
    console.log(state.input["tcp/address"])
    return {
      address: state.input["tcp/address"],
    };
  }
  return {};
};

export default connect(mapStateToProps)(TcpConnect);
