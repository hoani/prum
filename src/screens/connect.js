import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { styles, colors } from "../style/style";

import IconButton from '../input/iconButton';

import {AppContext} from '../state/appContext';
import TcpConnect from '../input/tcpConnect';

export default class ConnectScreen extends React.Component {

  static navigationOptions = {
    title: 'Connect',
  };

  render() {
    let {uiScreens, client} = this.context;
    return (
      <>
        <StatusBar barStyle="light-content" />

        <SafeAreaView style={{flex:1, backgroundColor: colors.header }}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{flex:1, ...styles.scrollView}}
          >
            <View style={styles.body}>

              <View style={styles.sectionContainer}>
                <TcpConnect client={client}/>
              </View>

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


