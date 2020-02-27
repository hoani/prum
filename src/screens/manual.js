import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Image from 'react-native-scalable-image';

import { Icon } from 'react-native-elements';

import PlotMulti from '../charts/PlotMulti';
import ProgressCircle from '../charts/ProgressCircle';

import { styles, colors } from "../style/style.js";

import {Packet} from 'leap-protocol';
import {AppContext} from '../state/appContext';


export default class ManualScreen extends React.Component {
  static navigationOptions = {
    title: 'Manual Control',
  };
  render() {
    let client = this.context.client;
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>

            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={{justifyContent:'center', alignItems:'center'}}>
                <Image
                  resizeMode="center"
                  width={Dimensions.get('window').width}
                  source={require("../../images/autodesk.png")}
                />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Hoani's Robot Control</Text>
                <Text style={styles.sectionDescription}>
                  Manual Control
                </Text>
              </View>

              <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:5, flexDirection:'column', backgroundColor: colors.container}}>
                  <View style={{flex:1, alignItems:'stretch', flexDirection:'row'}}>
                    <View style={{flex:1}} />
                    <View style={{flex:1}} >
                    <Icon
                        raised
                        name='angle-double-up'
                        type='font-awesome'
                        color={colors.p200}
                        reverseColor={colors.tOnPrimary}
                        reverse={true}
                        onPress={() => {
                          let packet = new Packet(
                            'set',
                            'control/manual',
                            ['FW', 0.2, 0.5]
                          );
                          client.send(packet);
                        }}
                      />
                    </View>
                    <View style={{flex:1}} />
                  </View>
                  <View style={{flex:1, alignItems:'stretch', flexDirection:'row'}}>
                  <View style={{flex:1}} >
                    <Icon
                        raised
                        name='angle-double-left'
                        type='font-awesome'
                        color={colors.p200}
                        reverseColor={colors.tOnPrimary}
                        reverse={true}
                        onPress={() => {
                          let packet = new Packet(
                            'set',
                            'control/manual',
                            ['LT', 0.2, 0.5]
                          );
                          client.send(packet);
                        }}
                      />
                  </View>
                  <View style={{flex:1}}>
                    <Icon
                      raised
                      name='stop-circle'
                      type='font-awesome'
                      color={colors.c1dp}
                      reverseColor={colors.tOnPrimary}
                      reverse={true}
                      onPress={() => {
                        let packet = new Packet(
                          'set',
                          'control/disable'
                        );
                        client.send(packet);
                      }}
                    />
                  </View>
                  <View style={{flex:1}} >
                    <Icon
                        raised
                        name='angle-double-right'
                        type='font-awesome'
                        color={colors.p200}
                        reverseColor={colors.tOnPrimary}
                        reverse={true}
                        onPress={() => {
                          let packet = new Packet(
                            'set',
                            'control/manual',
                            ['RT', 0.2, 0.5]
                          );
                          client.send(packet);
                        }}
                      />
                  </View>
                  </View>
                  <View style={{flex:1, alignItems:'stretch', flexDirection:'row'}}>
                    <View style={{flex:1}} />
                      <View style={{flex:1}} >
                        <Icon
                            raised
                            name='angle-double-down'
                            type='font-awesome'
                            color={colors.p200}
                            reverseColor={colors.tOnPrimary}
                            reverse={true}
                            onPress={() => {
                              let packet = new Packet(
                                'set',
                                'control/manual',
                                ['BW', 0.2, 0.5]
                              );
                              client.send(packet);
                            }}
                          />
                      </View>
                    <View style={{flex:1}} />
                  </View>
                </View>
                <View style={{flex:1}} />
                <View style={{flex:3}} >
                  <ProgressCircle path="health/os/cpuse" multiplier={0.01} showText={true} />
                </View>
                <View style={{flex:1}} />
              </View>
              <View style={{flex:3}}>
                {/* <PlotSingle path = "imu/gyros/x" showX = {false} /> */}
                <PlotMulti paths = {["imu/gyros/y", "imu/gyros/z"]} colors = {['#8a2be2', '#ff1493']}/>
                <PlotMulti paths = {["imu/accel/x", "imu/accel/y","imu/accel/z"]} />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

ManualScreen.contextType = AppContext;
