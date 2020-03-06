import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Image from 'react-native-scalable-image';

import { Icon } from 'react-native-elements';

import PlotMulti from '../charts/plotMulti';
import ProgressCircle from '../charts/progressCircle';
import BatteryGauge from '../charts/batteryGauge';

import { styles, colors } from "../style/style.js";

import {Packet} from 'leap-protocol';
import {AppContext} from '../state/appContext';


export default class ManualScreen extends React.Component {
  static navigationOptions = {
    title: 'Diagnostics',
  };

  render() {
    let client = this.context.client;

    const ManualButton = ({iconName, direction}) => (
      <Icon
        raised
        name={iconName}
        type='font-awesome'
        color={colors.p200}
        reverseColor={colors.tOnPrimary}
        reverse={true}
        onPress={() => {
          let packet = new Packet('set')
          packet.add('control/manual',[direction, 0.2, 0.5]);
          client.send(packet);
        }}
      />
    )
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{flex:1, backgroundColor: colors.header }}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{flex:1, ...styles.scrollView}}
          >
            <View style={{...styles.body}}>
              <View style={{...styles.sectionContainer, flexDirection:"row"}}>
                <View style={{flexDirection:"column"}}>
                  <ManualButton iconName='angle-double-up' direction='FW'/>
                  <ManualButton iconName='angle-double-down' direction='BW'/>
                </View>
                <View style={{flex:1, flexDirection: "row"}}>
                  <View style={{flex:1, flexDirection: "column"}}>
                    <Text style={{...styles.label, textAlign:"center", padding:4}}>CPU %</Text>
                    <View style={{flex:1}}>
                      <ProgressCircle path="health/os/cpuse" multiplier={0.01} unit="%" decimalPlaces={1} height={96} />
                    </View>
                  </View>
                  <View style={{flex:1, flexDirection: "column"}}>
                    <Text style={{...styles.label, textAlign: "center", padding:4}}>Battery</Text>
                    <View style={{flex:1}}>
                      <BatteryGauge path="health/batt/v" height={96} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

ManualScreen.contextType = AppContext;
