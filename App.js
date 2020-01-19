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

import Image from 'react-native-scalable-image';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen'; 

const net = require('react-native-tcp-socket').default;

const client = net.createConnection({port: 11337, host: '192.168.1.13' });
 
client.on('error', function(error) {
  console.log(error)
});
 
client.on('data', function(data) {
  //console.log('message was received', data)
});

const App: () => React$Node = () => {
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
              <Text style={styles.sectionTitle}>Hoani's Robot Control</Text>
              <Text style={styles.sectionDescription}>
                Manual Control
              </Text>
            </View>
          </View>
          <View style={{flex:1, flexDirection:'row'}}>
            <View style={{flex:3, flexDirection:'column'}}>
              <View style={{flex:1, alignItems:'stretch', flexDirection:'row'}}>
                <View style={{flex:1, backgroundColor:"#eee"}} />
                <View style={{flex:1}} >
                  <Button
                    onPress={() => {
                      let data = 'S8002:00:3f000000:3f000000\n';
                      alert(`Sent Forward command \n${data}`);
                      client.write(data);
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
                      let data = 'S8002:02:3f000000:3f000000\n';
                      alert(`Sent Left command \n${data}`);
                      client.write(data)
                    }}
                    title="Left"
                  />
                </View>
                <View style={{flex:1, backgroundColor:"#eee"}} />
                <View style={{flex:1}} >
                  <Button
                    onPress={() => {
                      let data = 'S8002:03:3f000000:3f000000\n';
                      alert(`Sent Right command \n${data}`);
                      client.write(data)
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
                      let data = 'S8002:01:3f000000:3f000000\n';
                      alert(`Sent Reverse command \n${data}`);
                      client.write(data)
                    }}
                    title="Reverse"
                  />
                </View>
                <View style={{flex:1, backgroundColor:"#eee"}} />
              </View>
            </View>
            <View style={{flex:2}} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
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

export default App;
