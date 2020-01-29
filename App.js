/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


import Image from 'react-native-scalable-image';

import PlotSingle from './src/charts/PlotSingle';
import PlotMulti from './src/charts/PlotMulti';
import ProgressCircleValue from './src/charts/ProgressCircleValue';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

//import Client from './src/comms/tcpClient';
import Client from './src/comms/fakeClient';
import reducer from './src/state/reducer';
import {Codec, Packet} from 'leap-protocol';

import leap_config from './protocol.json';

const store = createStore(reducer);

const codec = new Codec(leap_config);
if (codec.valid()) {
  console.log("Codec loaded");
}

const client = new Client(11337, 'localhost', codec, store);


class HomeScreen extends React.Component {
  render() {
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
                source={require("./images/autodesk.png")}
              />
            </View>
            <View style={styles.sectionContainer}>
              <Button
                onPress={() => {
                  client.connect({localAddress: 'localhost'});
                }}
                title="Connect"
              />
              <Text style={styles.sectionTitle}>Hoani's Robot Control</Text>
              <Text style={styles.sectionDescription}>
                Manual Control
              </Text>
            </View>

            <View style={{flex:1, flexDirection:'row'}}>
              <View style={{flex:10, flexDirection:'column'}}>
                <View style={{flex:1, alignItems:'stretch', flexDirection:'row'}}>
                  <View style={{flex:1, backgroundColor:"#eee"}} />
                  <View style={{flex:1}} >
                    <Button
                      onPress={() => {
                        let packet = new Packet(
                          'set',
                          'control/manual',
                          ['FW', 0.2, 0.5]
                        );
                        client.send(packet);
                      }}
                      title="Forward"
                    />
                  </View>
                  <View style={{flex:1, backgroundColor:"#eee"}} />
                </View>
                <View style={{flex:1, alignItems:'stretch', flexDirection:'row'}}>
                  <View style={{flex:1}} >
                    <Button
                      onPress={() => {
                        let packet = new Packet(
                          'set',
                          'control/manual',
                          ['LT', 0.2, 0.5]
                        );
                        client.send(packet);
                      }}
                      title="Left"
                    />
                  </View>
                  <View style={{flex:1, backgroundColor:"#eee"}} />
                  <View style={{flex:1}} >
                    <Button
                      onPress={() => {
                        let packet = new Packet(
                          'set',
                          'control/manual',
                          ['RT', 0.2, 0.5]
                        );
                        client.send(packet);
                      }}
                      title="RIGHT"
                    />
                  </View>
                </View>
                <View style={{flex:1, alignItems:'stretch', flexDirection:'row'}}>
                  <View style={{flex:1, backgroundColor:"#eee"}} />
                  <View style={{flex:1}} >
                    <Button
                      onPress={() => {
                        let packet = new Packet(
                          'set',
                          'control/manual',
                          ['BW', 0.2, 0.5]
                        );
                        client.send(packet);
                      }}
                      title="Reverse"
                    />
                  </View>
                  <View style={{flex:1, backgroundColor:"#eee"}} />
                </View>
              </View>
              <View style={{flex:1}} />
              <View style={{flex:3}} >
                <ProgressCircleValue path="health/os/cpuse" multiplier={0.01} />
              </View>
              <View style={{flex:1}} />
            </View>
            <View style={{flex:3}}>
              <PlotSingle path = "imu/gyros/x" show_x = {false} />
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

const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'inactive') {
      client.disconnect();
    }
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
