import { StyleSheet } from 'react-native';
import { completeHandlerIOS } from 'react-native-fs';


const colors = {
  primary: "#1337e7",
  p900: "#0000c0",
  p800: "#001bd0",
  p700: "#002ada",
  p600: "#1336e7",
  p500: "#1840f3",
  p400: "#4c60f8",
  p300: "#727efa",
  p200: "#9ea3fb",
  p100: "#c6c7fc",
  p50: "#e9e9fe",
  secondary: "#e7c413",
  s900: "#df6c00",
  s800: "#e39500",
  s700: "#e5ac08",
  s600: "#e7c413",
  s500: "#e8d619",
  s400: "#ebdb43",
  s300: "#eee165",
  s200: "#f3e991",
  s100: "#f8f2bd",
  s50: "#fcfae4",
  surface: "#121212",
  container: "#222222",
  header: "#333333",
  tEmphasis: "#dddddd",
  tNormal: "#aaaaaa",
  tDisable: "#777777",
  tOnPrimary: "#121212"
}


const containerStyles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.surface,
  },
  body: {
    backgroundColor: colors.surface,
  },
  sectionContainer: {
    marginTop: 24,
    paddingVertical: 16,
    marginHorizontal: 24,
    paddingHorizontal: 16,
    backgroundColor:colors.container,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.tNormal,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: colors.tNormal,
  },
});

const inputStyles = StyleSheet.create({
  textInput: {
    paddingLeft: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    color: colors.tNormal,
  },
});


const styles = {...containerStyles, ...inputStyles};


// React Navigation Theme
const theme = {
  Button: {

    titleStyle: {
      color: colors.tOnPrimary,
    },
    icon: {
      color: colors.tOnPrimary,
    },
    buttonStyle: {
      backgroundColor: colors.p200
    }
  },
};

const navbarStyle = {
  headerStyle: {
    backgroundColor: colors.header,
  },
  headerTintColor: colors.tEmphasis,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  tabBarIcon: ({focused, tintColor }) => (
    <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        tintColor={{ tintColor }}

    />
  ),
  tabBarOptions: {
      activeTintColor: '#cd077d',

  },
}


export {
  styles,
  colors,
  theme,
  navbarStyle
};