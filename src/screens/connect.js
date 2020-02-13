import React from 'react';
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Icon, Button } from 'react-native-elements';

import IconButton from '../input/IconButton';


import {AppContext} from '../state/appContext';

export default class ConnectScreen extends React.Component {
  static navigationOptions = {
    title: 'Connect',
    headerRight: () => (
      <View style={{flex: 1, flexDirection: 'row'}}>
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#333"
        backgroundColor="#bbb"
      />
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#333"
        backgroundColor="#bbb"
      />
      <Icon
        name='heartbeat'
        type='font-awesome'
        color='#f50'
        onPress={() => console.log('hello')} />
      <Icon
  name='rowing' />
      </View>
    ),
  };
  render() {
    let client = this.context.client;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionDescription}>
                  Connect Wifi
                </Text>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  value='192.168.1.13'
                />
                <IconButton
                  style={{paddingTop:12}}
                  iconName="wifi"
                  iconType="font-awesome"
                  iconColor="#fff"
                  title="Connect Wifi"
                  onPress={() => {
                    client.connect({localAddress: 'localhost'});
                  }}
                />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionDescription}>
                  Connect Bluetooth
                </Text>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  value='192.168.1.13'
                />
                <IconButton
                  style={{paddingTop:12}}
                  iconName="bluetooth"
                  iconType="font-awesome"
                  iconColor="#fff"
                  title="Connect Bluetooth"
                  onPress={() => {
                    client.connect({localAddress: 'localhost'});
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <SafeAreaView style={{flex: 1}}
          style={styles.sectionContainer}
        >
          <Text style={styles.sectionDescription}>
            Interfaces:
          </Text>

            <FlatList
              data={[
                {
                  iconName: 'gamepad',
                  title: 'Manual Control',
                  key: 'Manual'
                },
                {
                  iconName: 'flask',
                  title: 'Playground',
                  key: 'Playground'
                },
              ]}
              renderItem={({item}) =>
                <IconButton
                  style={{paddingTop:12}}
                  iconName={item.iconName}
                  iconType="font-awesome"
                  iconColor="#fff"
                  title={item.title}
                  onPress={() => {
                    this.props.navigation.navigate(item.key);
                  }}
                />
              }
            />
        </SafeAreaView>
      </>
    );
  }
};
ConnectScreen.contextType = AppContext;

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

