import React from 'react';
import { View } from 'react-native';
import { Path } from 'react-native-svg';

import { AreaChart, Grid, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import { connect } from 'react-redux';

import { newData } from '../../reducer';

class PlotSingle extends React.PureComponent {
    static defaultProps = {
        plot_data: [],
        path: "",
        show_x: true
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let { plot_data, show_x } = this.props;

        const Line = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={'rgb(134, 65, 244)'}
                fill={'none'}
            />
        );

        return (
            <View>
                <AreaChart
                    style={{ height: 120 }}
                    data={ plot_data }
                    contentInset={{ top: 10, bottom: 0 }}
                    curve={ shape.curveLinear }
                    svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
                    yAccessor={ ({ item }) => item.y }
                    xAccessor={ ({ item }) => item.x }
                >
                    <Grid/>
                    <Line/>
                </AreaChart>
                { show_x ? (
                <XAxis
                    style={{ marginHorizontal: -10, marginTop: 15}}
                    data={ plot_data }
                    yAccessor={ ({ item }) => item.y }
                    xAccessor={ ({ item }) => item.x }
                    formatLabel={ (value, index) => (Math.round(value * 10) % 20 === 0) ? (Math.round(value * 100) / 100).toFixed(1): null }
                    contentInset={{ left: 25, right: 25 }}
                />) : (<></>) }
            </View>
        )
    }
}

mapStateToProps = (state, ownProps) => {
    let storedData = state.plot_data;
    return {
        plot_data: storedData[ownProps.path],
    };
};

const mapDispatchToProps = {
    newData
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps)
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlotSingle);
