import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

import { styles, colors } from "../style/style.js";


import {AppContext} from '../state/appContext';
import ManualControls from '../input/manualControls';


export default class ManualScreen extends React.Component {
  static navigationOptions = {
    title: 'Manual Control',
  };
  render() {
    let client = this.context.client;
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{flex:1, backgroundColor: colors.header }}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{flex:1, ...styles.scrollView}}
          >
            <View style={{...styles.body}}>
              <View style={styles.sectionContainer}>
                <ManualControls client={client}/>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

ManualScreen.contextType = AppContext;
