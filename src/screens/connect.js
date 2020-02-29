import React from 'react';
import {
  TextInput,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

import Image from 'react-native-scalable-image';

import { styles, colors } from "../style/style";

import {input} from "../state/reducer"

import IconButton from '../input/IconButton';
import ConnectButton from '../input/ConnectButton';


import {AppContext} from '../state/appContext';
import TcpConnect from '../input/TcpConnect';

export default class ConnectScreen extends React.Component {

  static navigationOptions = {
    title: 'Connect',
  };

  render() {
    let {uiScreens, client} = this.context;
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{flex:1}}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{flex:1, ...styles.scrollView}}
          >
            <View style={styles.body}>

              <View style={styles.sectionContainer}>
                <TcpConnect client={client}/>
              </View>
              {/* <View style={styles.sectionContainer}>
                <Text style={styles.sectionDescription}>
                  Connect Wifi
                </Text>
                <TextInput
                  style={styles.textInput}
                  value='192.168.1.13'
                />
                <View style = {{paddingTop: 12}}>
                  <ConnectButton
                    style={{paddingTop:12}}
                    title="Connect Wifi"
                    onPressConnect={() => {
                      client.connect({localAddress: 'localhost'});
                    }}
                    onPressDisconnect={() => {
                      client.disconnect();
                    }}
                  />
                </View> 
              </View> */}

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionDescription}>
                    Interfaces:
                </Text>
                { 
                  uiScreens.map((item) => {
                    return (
                      <View style = {{paddingTop: 12}} key={item.title + "view"}>
                        <IconButton
                          key={item.title}
                          iconName={item.iconName}
                          iconType="font-awesome"
                          iconColor="#fff"
                          title={item.title}
                          onPress={() => {
                            this.props.navigation.navigate(item.key);
                          }}
                        />
                      </View>
                    );
                  })
                }
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};
ConnectScreen.contextType = AppContext;


