import React from 'react'
import { ProgressCircle }  from 'react-native-svg-charts';
import { View } from 'react-native';
import { Text } from 'react-native-svg';


import { connect } from 'react-redux';

import { newData } from '../state/reducer';

class ProgressCircleValue extends React.PureComponent {
    static defaultProps = {
        rawValue: 0.0,
        offset: 0.0,
        multiplier: 1.0,
        textMultiplier: 1.0,
        path: "",
        decimalPlaces: 2,
        unit: "",
        height: 120
    };

    render() {
        let { rawValue, multiplier, textMultiplier } = this.props;
        let {decimalPlaces, unit } = this.props;
        let {height} = this.props;


        let value = (rawValue * multiplier)
        let textValue = (rawValue * textMultiplier)

        const Label = ({height}) => {
            return (
                <Text
                    x={0}
                    y={0}
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={height/4}
                    stroke={'black'}
                    strokeWidth={height/480}
                >
                    {(textValue).toFixed(decimalPlaces) + unit}
                </Text>
            )
        }

        return (
            <View>
                <ProgressCircle
                    style={ { height } }
                    progress={ value }
                    data={ value}
                    strokeWidth={height/12}
                    progressColor={'rgb(134, 65, 244)'}
                >
                <Label />
                </ProgressCircle>
            </View>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    let storedData = state.current_data;
    return {
        rawValue: storedData[ownProps.path],
    };
};

const mapDispatchToProps = {
    newData
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressCircleValue);
