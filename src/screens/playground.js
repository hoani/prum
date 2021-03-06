import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Switch
} from 'react-native';

import { styles, colors } from "../style/style.js";

import Image from 'react-native-scalable-image';

import PlotMulti from '../charts/plotMulti';
import Plot3DOF from '../charts/plot3DOF';
import ProgressCircle from '../charts/progressCircle';
import AngleIndicator from '../charts/angleIndicator';


import {AppContext} from '../state/appContext';


export default class PlaygroundScreen extends React.Component {
  static navigationOptions = {
    title: 'Playground',
  };
  render() {
    let client = this.context.client;
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ backgroundColor: colors.header }}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>

            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Component Playground</Text>
              </View>

              <View style={{flex:3, flexDirection: "row", ...styles.sectionContainer}} >
                <View style={{flex:2}}>
                <ProgressCircle
                  path="health/os/cpuse"
                  multiplier={0.01}
                  textMultiplier={1.0}
                  textUnit="%"
                  fontSizePercent={80}
                  iconNames={['battery-0', 'battery-1', 'battery-2', 'battery-3', 'battery-4']}
                  iconTypes={['font-awesome', 'font-awesome', 'font-awesome', 'font-awesome', 'font-awesome']}
                  iconColors={['#822', '#a82', '#6a2', '#492', '#282' ]}
                  iconIntervals={[35.0, 39.0, 43.0, 47.0, 100.0 ]}
                  barColors={['#a33', '#da3', '#8d3', '#5b3', '#3a3' ]}
                  barIntervals={[35.0, 39.0, 43.0, 47.0, 100.0 ]}
                />
                </View><View style={{flex:1}}>

                <AngleIndicator path='ahrs/angles/pitch' unit="%" decimalPlaces={1} height={64} />
                </View><View style={{flex:3}}>
                <ProgressCircle path="health/os/cpuse" multiplier={0.01} unit="%" decimalPlaces={1} height={200} />
                </View>
              </View>
              <View style={{flex:1, ...styles.sectionContainer}}>
                <Switch
                  onValueChange={(value) => {
                    console.log(value)
                    value = true;
                  }}
                  thumbColor={colors.p50}
                />
              </View>
              <View style={{flex:3, ...styles.sectionContainer}}>
                {/* <PlotSingle path = "imu/gyros/x" showX = {false} /> */}
                <PlotMulti height={80} title = "gyroscope" paths={["imu/gyros/x", "imu/gyros/y", "imu/gyros/z"]} colors = {['#8a2be2', '#ff1493']}/>
              </View>
              <View style={{flex:3, ...styles.sectionContainer}}>
                <Plot3DOF
                  title = "acceleration"
                  paths = {["imu/accel/x", "imu/accel/y","imu/accel/z"]}
                  labels =  {["x", "y", "z"]}
                  showY = {true}
                />
              </View>
              <View style={{justifyContent:'center', alignItems:'center'}}>
              <Image
                  resizeMode="center"
                  width={Dimensions.get('window').width}
                  source={require("../../images/autodesk.png")}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <SafeAreaView style={{ flex: 1, ...styles.scrollView }}></SafeAreaView>
      </>
    );
  }
};

PlaygroundScreen.contextType = AppContext;
