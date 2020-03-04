import React from 'react';
import { ProgressCircle }  from 'react-native-svg-charts';
import { Text } from 'react-native-svg';

import { colors as styleColors } from "../style/style.js";

import { connect } from 'react-redux';

import { newData } from '../state/reducer';

class AngleIndicator extends React.PureComponent {
    static defaultProps = {
        rawValue: 0.0,
        multiplier: Math.PI/180.0,
        textMultiplier: 1.0,
        path: "",
        height: 120,
        decimalPlaces: 0,
        textUnit: "\u00b0",
        fontSizePercent: 80.0,
        showText: true,
        barColors: [styleColors.p200],
        barIntervals: [100.0],
    };

    render() {
        let { height } = this.props;
        let { rawValue, multiplier, textMultiplier} = this.props;

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
                <ProgressCircle
                    style={ { height } }
                    progress={ 1 }
                    strokeWidth={strokeWidth}
                    backgroundColor={styleColors.c1dp}
                    progressColor={barColor}
                    startAngle={value-Math.PI/6}
                    endAngle={value+Math.PI/6}

                >
                    <Label/>
                </ProgressCircle>
            </>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    let storedData = state.data.current;
    return {
        rawValue: storedData[ownProps.path],
    };
};

const mapDispatchToProps = {
    newData
};

export default connect(mapStateToProps, mapDispatchToProps)(AngleIndicator);
