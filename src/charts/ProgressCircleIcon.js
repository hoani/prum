import React from 'react'
import { ProgressCircle }  from 'react-native-svg-charts';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import { Text } from 'react-native-svg';

import { connect } from 'react-redux';

import { newData } from '../state/reducer';

class ProgressCircleIcon extends React.PureComponent {
    static defaultProps = {
        rawValue: 0.0,
        offset: 0.0,
        multiplier: 1.0,
        textMultiplier: 1.0,
        iconColors: ['#f50', '#2c2'],
        iconNames: ["heart", "plug"],
        iconTypes: ["font-awesome", "font-awesome"],
        iconIntervals: [40.0, 100.0],
        path: "",
        height: 120,
        decimalPlaces: 2,
        unit: ""
    };

    render() {
        let { height, iconColors, iconNames, iconTypes, iconIntervals } = this.props;
        let { rawValue, multiplier, textMultiplier} = this.props;
        let { decimalPlaces, unit} = this.props;
        let iconName = "question";
        let iconType = "font-awesome";
        let iconColor = "#FFF";

        for (let i = 0; i < iconIntervals.length; i+=1) {
            if (rawValue <= iconIntervals[i]) {
                iconName = iconNames[i];
                iconType = iconTypes[i];
                iconColor = iconColors[i];
                break;
            }
        }

        let strokeWidth = height/10.0;
        let value = (rawValue * multiplier)
        let textValue = (rawValue * textMultiplier)

        const Label = ({height}) => {
            return (
                <>
                    <G
                        style={{position:'absolute', alignSelf:'center'}}

                        x={0}
                        y={0}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}>
                        <Icon
                            name={iconName}
                            type={iconType}
                            size={height/2}
                            color={iconColor}
                            containerStyle ={{
                                alignSelf:'center',
                                position:'absolute',
                                top: height/4,
                            }}
                        />
                    </G>
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
                </>
            )
        }

        return (
            <>
                <ProgressCircle
                    style={ { height } }
                    progress={ value }
                    data={ value}
                    strokeWidth={strokeWidth}
                    progressColor={'rgb(134, 65, 244)'}
                >
                </ProgressCircle>
                <Icon
                    name={iconName}
                    type={iconType}
                    size={height/2}
                    color={iconColor}
                    containerStyle ={{
                        alignSelf:'center',
                        position:'absolute',
                        top: height/4,
                    }}
                />
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
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProgressCircleIcon);
