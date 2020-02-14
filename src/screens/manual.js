import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import Image from 'react-native-scalable-image';

import { Icon } from 'react-native-elements';

import PlotSingle from '../charts/PlotSingle';
import PlotMulti from '../charts/PlotMulti';
import ProgressCircle from '../charts/ProgressCircle';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

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
        <StatusBar barStyle="dark-content" />
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
                <View style={{flex:5, flexDirection:'column'}}>
                  <View style={{flex:1, alignItems:'stretch', flexDirection:'row'}}>
                    <View style={{flex:1, backgroundColor:"#eee"}} />
                    <View style={{flex:1}} >
                    <Icon
                        raised
                        name='angle-double-up'
                        type='font-awesome'
                        color='#f50'
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
                    <View style={{flex:1, backgroundColor:"#eee"}} />
                  </View>
                  <View style={{flex:1, alignItems:'stretch', flexDirection:'row'}}>
                  <View style={{flex:1}} >
                    <Icon
                        raised
                        name='angle-double-left'
                        type='font-awesome'
                        color='#f50'
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
                  <View style={{flex:1, backgroundColor:"#eee"}}>
                    <Icon
                      raised
                      name='stop-circle'
                      type='font-awesome'
                      color='#f50'
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
                        color='#f50'
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
                    <View style={{flex:1, backgroundColor:"#eee"}} />
                      <View style={{flex:1}} >
                        <Icon
                            raised
                            name='angle-double-down'
                            type='font-awesome'
                            color='#f50'
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
                    <View style={{flex:1, backgroundColor:"#eee"}} />
                  </View>
                </View>
                <View style={{flex:1}} />
                <View style={{flex:3}} >
                  <ProgressCircle path="health/os/cpuse" multiplier={0.01} showText={true} />
                </View>
                <View style={{flex:1}} />
              </View>
              <View style={{flex:3}}>
                {/* <PlotSingle path = "imu/gyros/x" show_x = {false} /> */}
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

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});