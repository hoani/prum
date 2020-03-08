import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { Icon } from 'react-native-elements';

import PlotBar from '../charts/plotBar';
import PlotMulti from '../charts/plotMulti';
import Plot3DOF from '../charts/plot3DOF';
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
              <View style={{...styles.sectionContainer, flexDirection:"column"}}>
                <Text style={{...styles.sectionTitle, textAlign:"center"}}>
                  Health
                </Text>
                <View style={{flex:1, flexDirection:"row"}}>
                  <View style={{flex:0, flexDirection:"column"}}>
                  </View>
                  <View style={{flex:2, flexDirection: "row"}}>
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
              <View style={{...styles.sectionContainer, flexDirection:"column"}}>
                <Text style={{...styles.sectionTitle, textAlign:"center"}}>
                  Motor Output
                </Text>
                <View style={{flexDirection:"row"}}>
                  <View style={{flexDirection:"column"}}>
                    <ManualButton iconName='angle-double-up' direction='FW'/>
                    <ManualButton iconName='angle-double-down' direction='BW'/>
                  </View>
                  <View style={{flexDirection:"column"}}>
                    <ManualButton iconName='angle-double-left' direction='LT'/>
                    <ManualButton iconName='angle-double-right' direction='RT'/>
                  </View>
                  <View style={{flex:1, flexDirection: "row"}}>
                    <View style={{flex:1, flexDirection: "column"}}>
                      <View style={{flex:1}}>
                        <PlotBar
                          paths={["motor/left", "motor/right"]}
                          showY={true}
                          labels={["Left", "Right"]}
                          colors={[colors.p300, colors.p100]}
                          height={120}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection:"row"}}>
                  <PlotMulti
                    paths={["motor/left", "motor/right"]}
                    showY={true}
                    showX={false}
                    labels={["Left", "Right"]}
                    colors={[colors.p300, colors.p100]}
                    height={120}
                  />
                </View>
              </View>
            </View>
            <View style={{...styles.sectionContainer}}>
              <Text style={{...styles.sectionTitle, textAlign:"center", paddingBottom:10}}>
                IMU
              </Text>
              <Plot3DOF
                title = "acceleration"
                paths = {["imu/accel/x", "imu/accel/y","imu/accel/z"]}
                labels =  {["x", "y", "z"]}
                showY = {true}
                height = {160}
              />
              <Plot3DOF
                title = "gyroscope"
                paths = {["imu/gyros/x", "imu/gyros/y","imu/gyros/z"]}
                labels =  {["x", "y", "z"]}
                showY = {true}
                height = {160}
              />
              <Plot3DOF
                title = "magnetometer"
                paths = {["imu/magne/x", "imu/magne/y","imu/magne/z"]}
                labels =  {["x", "y", "z"]}
                showY = {true}
                height = {160}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

ManualScreen.contextType = AppContext;
