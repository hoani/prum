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

import {Packet} from 'leap-protocol';

class PidControls extends React.PureComponent {

  render() {
    let {enabled, client} = this.props;
    let {kp, ki, kd, setpoint} = this.props;
    console.log(kp)

    let disableGains = false;
    let disableSetpoint = false;

    let reFloat = /^\d{1,}\.\d{1,}$/;

    if (reFloat.test(kp) == false || reFloat.test(ki) == false || reFloat.test(kd) == false) {
      disableGains = true;
    }
    if (reFloat.test(setpoint) == false) {
      disableSetpoint = true;
    }

    return (
      <>
        <View style={{flexDirection: "column"}}>
          <View style={{flexDirection: "row"}}>
            <Text style={{
              ...styles.label,
              flex:1,
              textAlignVertical: "center",
              textAlign:"right",
              marginVertical:4
            }}>
              Enable
            </Text>
            <Switch
              onValueChange={(value) => {
                this.props.input("pid/enabled", value)
                let packet = new Packet("set");
                if (value) {
                  packet.add('control/pendulum/enable', []);
                }
                else {
                  packet.add('control/disable', []);
                }
                client.send(packet);
              }}
              value={enabled}
              thumbColor={colors.p50}
              trackColor={colors.s200}
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
                  defaultValue={kp}
                  onChangeText={(value) => this.props.input("pid/kp", value)}
                  />
              </View>
              <View style={{flex:1, flexDirection:"column", padding:2}}>
                <Text style={{...styles.sectionDescription, flex:1, paddingVertical:5, textAlign:"center"}}>
                  Ki
                </Text>
                <TextInput
                  style={{...styles.textInput, flex:3}}
                  defaultValue={ki}
                  onChangeText={(value) => this.props.input("pid/ki", value)}
                  />
              </View>
              <View style={{flex:1, flexDirection:"column", padding:2}}>
                <Text style={{...styles.sectionDescription, flex:1, paddingVertical:5, textAlign:"center"}}>
                  Kd
                </Text>
                <TextInput
                  style={{...styles.textInput, flex:3}}
                  defaultValue={kd}
                  onChangeText={(value) => this.props.input("pid/kd", value)}
                />
              </View>
            </View>
            <View style={{flex:3, justifyContent:"flex-end", paddingVertical:2, paddingHorizontal:5}}>
              <IconButton
                iconName="send"
                iconType="font-awesome"
                title='     Send'
                disabled={disableGains}
                onPress={ () => {
                  let packet = new Packet(
                    'set',
                    'control/pendulum/gains',
                    [kp, ki, kd]
                  );
                  client.send(packet);
                }}
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
                  onChangeText={(value) => this.props.input("pid/setpoint", value)}
                />
              </View>
            </View>
            <View style={{flex:3, justifyContent:"flex-end", paddingVertical:2, paddingHorizontal:5}}>
              <IconButton
                iconName="send"
                iconType="font-awesome"
                title='     Send'
                disabled={disableSetpoint}
                onPress={ () => {
                  let packet = new Packet(
                    'set',
                    'control/pendulum/setpoint',
                    [setpoint]
                  );
                  client.send(packet);
                }}
              />
            </View>
          </View>
        </View>
      </>
    );
  }
}

function checkInputState(inputState, inputKey, currentProps, propsKey, outputProps) {
  if (inputKey in inputState) {
    if (inputState[inputKey] != currentProps[propsKey]) {
      outputProps[propsKey] = inputState[inputKey];
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let newProps = {};
  checkInputState(state.input, "pid/kp", ownProps, "kp", newProps);
  checkInputState(state.input, "pid/ki", ownProps, "ki", newProps);
  checkInputState(state.input, "pid/kd", ownProps, "kd", newProps);
  checkInputState(state.input, "pid/setpoint", ownProps, "setpoint", newProps);
  checkInputState(state.input, "pid/enabled", ownProps, "enabled", newProps);
  return newProps;
};

const mapDispatchToProps = {
  input
};

const ConnectedPidControls = connect(mapStateToProps, mapDispatchToProps)(PidControls);

ConnectedPidControls.defaultProps = {
  enabled:false,
  client: null,
  kp: "1.0",
  ki: "0.0",
  kd: "0.0",
  setpoint: "0.0",
};

export default ConnectedPidControls;
