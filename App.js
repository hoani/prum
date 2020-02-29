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
import { ThemeProvider } from 'react-native-elements';

import { createStore } from 'redux';
import { Provider} from 'react-redux';

// import Client from './src/comms/fakeClient';
import Client from './src/comms/tcpClient';
import reducer from './src/state/reducer';
import {Codec} from 'leap-protocol';
import {AppContext} from './src/state/appContext';

import leap_config from './protocol.json';
import ConnectScreen from './src/screens/connect';
import ManualScreen from './src/screens/manual';
import PlaygroundScreen from './src/screens/playground';
import {theme, navbarStyle} from './src/style/style';

import 'react-native-gesture-handler';

const store = createStore(reducer);

const codec = new Codec(leap_config);
if (codec.valid()) {
  console.log("Codec loaded");
}

const client = new Client(11337, 'localhost', codec, store);

const MainNavigator = createStackNavigator(
  {
    Connect: {screen: ConnectScreen},
    Manual: {screen: ManualScreen},
    Playground: {screen: PlaygroundScreen}
  },
  {
    initialRouteName: 'Connect',
    defaultNavigationOptions: navbarStyle,
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
    let uiScreens = [
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
    ];
    return (
      <ThemeProvider theme = {theme}>
        <AppContext.Provider value={{client: client, uiScreens: uiScreens}}>
          <Provider store={store}>
            <AppContainer screenProps/>
          </Provider>
        </AppContext.Provider>
      </ThemeProvider>
    );
  }
}
