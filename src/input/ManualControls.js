import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import { Slider, Icon } from 'react-native-elements';

import { styles, colors } from "../style/style.js";

import {Packet} from 'leap-protocol';

import {input} from "../state/reducer"


import { connect } from 'react-redux';

class ManualControls extends React.PureComponent {
  static defaultProps = {
    client: null,
    power: 0.5,
    duration: 0.5,
  };

  render() {
    let {client, power, duration} = this.props;

    const makeAndSendPacket = (direction) => {
      let packet = new Packet(
        'set',
        'control/manual',
        [direction, power, duration]
      );
      client.send(packet);
    }

    const IconButton = ({iconName, direction}) => (
      <Icon
        raised
        name={iconName}
        type='font-awesome'
        color={colors.p200}
        reverseColor={colors.tOnPrimary}
        reverse={true}
        onPress={() => {
          makeAndSendPacket(direction)
        }}
      />
    )

    return (
      <>
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:7, flexDirection:'column', backgroundColor: colors.container}}>
            <View style={{flex:1, alignItems:'stretch', flexDirection:'row'}}>
              <View style={{flex:1}} />
              <View style={{flex:1}} >
                <IconButton iconName='angle-double-up' direction="FW"/>
              </View>
              <View style={{flex:1}} />
            </View>
            <View style={{flex:1, alignItems:'stretch', flexDirection:'row'}}>
              <View style={{flex:1}} >
                <IconButton iconName='angle-double-left' direction="LT"/>
              </View>
              <View style={{flex:1}}/>
              <View style={{flex:1}} >
                <IconButton iconName='angle-double-right' direction="RT"/>
              </View>
            </View>
            <View style={{flex:1, alignItems:'stretch', flexDirection:'row'}}>
              <View style={{flex:1}} />
                <View style={{flex:1}} >
                  <IconButton iconName='angle-double-down' direction="BW"/>
                </View>
              <View style={{flex:1}} />
            </View>
          </View>
          <View style={{flex:1}}/>
          <View style={{flex:5, flexDirection:'row'}}>
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
              <Text style={styles.sectionDescription}>Speed: {power.toFixed(1)}</Text>
              <Slider
                minimumValue={0.0}
                maximumValue={1.0}
                step={0.1}
                value={power}
                onValueChange={value => this.props.input("manual/power", value)}
              />  
              <Text style={styles.sectionDescription}>Duration: {duration.toFixed(1)} s</Text>
              <Slider
                minimumValue={0.0}
                maximumValue={1.0}
                step={0.1}
                value={duration}
                onValueChange={value => this.props.input("manual/duration", value)}
              />  
            </View>
          </View>
        </View>  
      </>
    );
  }
}
const mapStateToProps = (state) => {
  let ret = {};
  if ("manual/power" in state.input) {
    ret = {
      ...ret,
      power: state.input["manual/power"],
    }
  }
  if ("manual/duration" in state.input) {
    ret = {
      ...ret,
      duration: state.input["manual/duration"],
    }
  }

  return ret;
};

const mapDispatchToProps = {
  input
};

export default connect(mapStateToProps, mapDispatchToProps)(ManualControls);
