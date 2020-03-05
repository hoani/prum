import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Switch,
} from 'react-native';

import { styles, colors } from "../style/style.js";

import {AppContext} from '../state/appContext';

import AngleIndicator from '../charts/AngleIndicator';
import PlotMulti from '../charts/PlotMulti';

import IconButton from '../input/IconButton';
import PidControls from '../input/PidControls';


export default class PidControlScreen extends React.Component {
  static navigationOptions = {
    title: 'Pid Control',
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
              <View style={{...styles.sectionContainer, flexDirection: "column"}}>
                <PidControls client={client}/>
              </View>
              <View style={{...styles.sectionContainer, flexDirection: "column"}}>
                <View style={{flexDirection: "row"}}>
                  <Text style={{...styles.sectionDescription, flex:1, paddingVertical:5, textAlign:"center"}}>
                    Pitch
                  </Text>
                  <Text style={{...styles.sectionDescription, flex:1, paddingVertical:5, textAlign:"center"}}>
                    Yaw
                  </Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  <View style={{flex: 1}}>
                    <AngleIndicator
                      path='ahrs/angles/pitch'
                      decimalPlaces={1}
                      height={128}
                      barColors={[colors.p200]}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <AngleIndicator
                      path='ahrs/angles/yaw'
                      decimalPlaces={1}
                      height={128}
                      barColors={[colors.s200]}
                    />
                  </View>
                </View>
              </View>
              <View style={{...styles.sectionContainer, flexDirection:"row"}}>
                <PlotMulti
                  title={"Angles"}
                  paths={["ahrs/angles/pitch", "ahrs/angles/yaw"]}
                  showX={true}
                  showY={true}
                  labels={["Pitch", "Yaw"]}
                  colors={[colors.p300, colors.s300]}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

PidControlScreen.contextType = AppContext;
