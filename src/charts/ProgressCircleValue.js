import React from 'react'
import { ProgressCircle }  from 'react-native-svg-charts';
import { View } from 'react-native';
import { Text } from 'react-native-svg';


import { connect } from 'react-redux';

import { newData } from '../state/reducer';

class ProgressCircleValue extends React.PureComponent {
    static defaultProps = {
        value: 0.0,
        offset: 0.0,
        multiplier: 1.0,
        path: ""
    };

    render() {
        let { value, multiplier } = this.props;

        const Label = () => {
            return (
                <Text
                    x={0}
                    y={0}
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={24}
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {((value / multiplier)).toFixed(1)}
                </Text>
            )
        }

        return (
            <View>
                <ProgressCircle
                    style={ { height: 120 } }
                    progress={ value }
                    data={ value}
                    strokeWidth={10}
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
        value: storedData[ownProps.path]* ownProps.multiplier,
    };
};

const mapDispatchToProps = {
    newData
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressCircleValue);
