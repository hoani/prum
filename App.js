/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

//import Client from './src/comms/tcpClient';
import Client from './src/comms/fakeClient';
import reducer from './src/state/reducer';
import {Codec, Packet} from 'leap-protocol';
import {AppContext} from './src/state/appContext';

import leap_config from './protocol.json';
import ManualScreen from './src/screens/manual';

const store = createStore(reducer);

const codec = new Codec(leap_config);
if (codec.valid()) {
  console.log("Codec loaded");
}

const client = new Client(11337, 'localhost', codec, store);

const MainNavigator = createStackNavigator(
  {
    Home: {screen: ManualScreen},
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
      <AppContext.Provider value={{client: client}}>
        <Provider store={store}>
          <AppContainer screenProps/>
        </Provider>
      </AppContext.Provider>
    );
  }
}
