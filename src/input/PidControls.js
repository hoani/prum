import React from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
} from 'react-native';

import { styles, colors} from "../style/style";

import {input} from "../state/reducer"

import IconButton from '../input/IconButton';

import { connect } from 'react-redux';

class TcpConnect extends React.PureComponent {
  static defaultProps = {
    enabled:false,
    client: null,
    kp: 1.0,
    ki: 0.0,
    kd: 0.0,
    setpoint: 0.0,
  };

  render() {
    let {enabled, client} = this.props;
    let {kp, ki, kd, setpoint} = this.props;

    let disableGains = false;
    let disableSetpoint = false;

    let reFloat = /^\d{1,}\.\d{1,}$/;

    if ((reFloat.test(kp) && reFloat.test(ki) && reFloat.test(kd)) == false) {
      disableGains = true;
    }
    if (reFloat.test(setpoint) == false) {
      disableSetpoint = true;
    }

    return (
      <>
        <View style={{flexDirection: "column"}}>
          <View style={{flexDirection: "row"}}>
            <Switch
              onValueChange={(value) => {
                console.log(value)
                value = true;
              }}
              thumbColor={colors.p50}
            />
          </View>
          <View style={{flexDirection: "row"}}>
            <View style={{flex:5, flexDirection:"row"}}>
              <View style={{flex:1, flexDirection:"column", padding:2}}>
                <Text style={{...styles.sectionDescription, flex:1, paddingVertical:5, textAlign:"center"}}>
                  Kp
                </Text>
                <TextInput
                  style={{...styles.textInput, flex:3}}
                  defaultValue={"1.00"}
                  onChangeText={(value) => {console.log(value)}}
                />
              </View>
              <View style={{flex:1, flexDirection:"column", padding:2}}>
                <Text style={{...styles.sectionDescription, flex:1, paddingVertical:5, textAlign:"center"}}>
                  Ki
                </Text>
                <TextInput
                  style={{...styles.textInput, flex:3}}
                  defaultValue={"1.00"}
                  onChangeText={(value) => {console.log(value)}}
                />
              </View>
              <View style={{flex:1, flexDirection:"column", padding:2}}>
                <Text style={{...styles.sectionDescription, flex:1, paddingVertical:5, textAlign:"center"}}>
                  Kd
                </Text>
                <TextInput
                  style={{...styles.textInput, flex:3}}
                  defaultValue={"1.00"}
                  onChangeText={(value) => {console.log(value)}}
                />
              </View>
            </View>
            <View style={{flex:3, justifyContent:"flex-end", paddingVertical:2, paddingHorizontal:5}}>
              <IconButton
                iconName="send"
                iconType="font-awesome"
                title='     Send'
              />
            </View>
          </View>
          <View style={{ flexDirection: "row"}}>
            <View style={{flex:5, flexDirection:"row"}}>
              <View style={{flex:1, flexDirection:"column", padding:2}}>
                <Text style={{...styles.sectionDescription, flex:1, paddingVertical:5, textAlign:"center"}}>
                  Setpoint
                </Text>
                <TextInput
                  style={{...styles.textInput, flex:3}}
                  defaultValue={"1.00"}
                  onChangeText={(value) => {console.log(value)}}
                />
              </View>
            </View>
            <View style={{flex:3, justifyContent:"flex-end", paddingVertical:2, paddingHorizontal:5}}>
              <IconButton
                iconName="send"
                iconType="font-awesome"
                title='     Send'
              />
            </View>
          </View>
        </View>
        {/* <Text style={styles.sectionDescription}>
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
        </View> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(TcpConnect);
