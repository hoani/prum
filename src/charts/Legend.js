import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';


class Legend extends React.PureComponent {

  render() {
    let { labels, colors, iconNames, iconTypes } = this.props;

    if (iconNames.length == 0) {
      iconNames = ["circle"];
      iconTypes = ["font-awesome"];
    }

    if (colors.length == 0) {
      colors = ["#000"];
    }

    return (
      <View style={ {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        }}
      >

        {
          labels.map((label, index) => {
            let color = colors[index % colors.length];
            let iconName = iconNames[index % iconNames.length];
            let iconType = iconTypes[index % iconTypes.length];

            return (
              <View style={{
                paddingLeft:5,
                paddingRight:5,
                flexDirection: "row",
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Icon
                  name={iconName}
                  type={iconType}
                  color={color}
                  size={14}
                />
                <Text style={{paddingLeft: 5}} color={color}>{label}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}

Legend.defaultProps = {
    colors: [],
    labels: [],
    iconNames: [],
    iconTypes: [],
}

export default Legend;

