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
        textUnit: "",
        fontSizePercent: 100.0,
        showText: true,
        barColors: ['#d20', '#4b4'],
        barIntervals: [40.0, 100.0],

    };

    render() {
        let { height, iconColors, iconNames, iconTypes, iconIntervals } = this.props;
        let { rawValue, multiplier, textMultiplier} = this.props;


        let iconName = "";
        let iconType = "";
        let iconColor = "";

        for (let i = 0; i < iconIntervals.length; i+=1) {
            if (rawValue <= iconIntervals[i]) {
                iconName = iconNames[i];
                iconType = iconTypes[i];
                iconColor = iconColors[i];
                break;
            }
        }

        let {barColors, barIntervals} = this.props;

        let barColor = barColors[barColors.length -1]

        for (let i = 0; i < barIntervals.length; i+=1) {
            if (rawValue <= barIntervals[i]) {
                barColor = barColors[i];
                break;
            }
        }

        let strokeWidth = height/10.0;
        let value = (rawValue * multiplier)
        let textValue = (rawValue * textMultiplier)

        const Label = ({height}) => {
            let { decimalPlaces, textUnit, fontSizePercent, showText} = this.props;

            let fontSize = fontSizePercent * 0.01 * (height * 0.25);
            return (
                <>
                    { showText ?
                    <Text
                        x={0}
                        y={0}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={fontSize}
                        fontWeight={'bold'}
                        stroke={'black'}
                        strokeWidth={height/256}
                    >
                        {(textValue).toFixed(decimalPlaces) + textUnit}
                    </Text>
                    : <></>}
                </>
            )
        }

        return (
            <>
                { iconName !== "" ?
                <Icon
                    name={iconName}
                    type={iconType}
                    size={height*0.6}
                    color={iconColor}
                    containerStyle ={{
                        alignSelf:'center',
                        position:'absolute',
                        top: height*0.2,
                    }}
                />
                : <></>}
                <ProgressCircle
                    style={ { height } }
                    progress={ value }
                    data={ value}
                    strokeWidth={strokeWidth}
                    progressColor={barColor}

                >
                    <Label/>
                </ProgressCircle>
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
