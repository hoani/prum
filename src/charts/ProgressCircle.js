import React from 'react'
import { ProgressCircle as SvgProgressCircle }  from 'react-native-svg-charts';
import { Icon } from 'react-native-elements';
import { Text } from 'react-native-svg';

import { colors as styleColors } from "../style/style.js";

import { connect } from 'react-redux';

import { newData } from '../state/reducer';

class ProgressCircle extends React.PureComponent {
    static defaultProps = {
        rawValue: 0.0,
        offset: 0.0,
        multiplier: 1.0,
        textMultiplier: 1.0,
        iconColors: [],
        iconNames: [],
        iconTypes: [],
        iconIntervals: [],
        path: "",
        height: 120,
        decimalPlaces: 0,
        textUnit: "",
        fontSizePercent: 100.0,
        showText: true,
        barColors: ['#77c'],
        barIntervals: [100.0],

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
                        fill={styleColors.tEmphasis}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={fontSize}
                        fontWeight={'bold'}
                        stroke={'black'}
                        strokeWidth={height/128}
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
                    size={height*0.5}
                    color={iconColor}
                    containerStyle ={{
                        alignSelf:'center',
                        position:'absolute',
                        top: height*0.25,
                    }}
                />
                : <></>}
                <SvgProgressCircle
                    style={ { height } }
                    progress={ value }
                    data={ value}
                    strokeWidth={strokeWidth}
                    backgroundColor={styleColors.c1dp}
                    progressColor={barColor}

                >
                    <Label/>
                </SvgProgressCircle>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProgressCircle);
