import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Path } from 'react-native-svg';

import { AreaChart, Grid, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import { connect } from 'react-redux';

import { newData } from '../../reducer';

class PlotMulti extends React.PureComponent {

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let { plot_data, paths, colors, show_x } = this.props;

        const Line = ({ line, color }) => (
            <Path
                key={'line'}
                d={line}
                stroke={color}
                fill={'none'}
            />
        );

        let yMin = 0.0;
        let yMax = 0.0;

        for (path of paths) {
            yMin = -2;
            yMax = 2;
        }

        return (
            <View style={ { height: 200 } }>
                {
                    paths.map((path, index) => {
                        return (
                            <AreaChart
                                style={ StyleSheet.absoluteFill }
                                data={ plot_data[path] }
                                svg={{ fill: colors[index] }}
                                contentInset={ { top: 20, bottom: 20 } }
                                curve={ shape.curveNatural }
                                yAccessor={ ({ item }) => item.y }
                                xAccessor={ ({ item }) => item.x }
                                yMin = {yMin}
                                yMax = {yMax}
                            >
                                <Line color={colors[index]}/>
                            </AreaChart>
                        )
                    })
                }
                {/* { show_x ? (
                <XAxis
                    style={{ marginHorizontal: -10, marginTop: 15}}
                    data={ plot_data }
                    yAccessor={ ({ item }) => item.y }
                    xAccessor={ ({ item }) => item.x }
                    formatLabel={ (value, index) => (Math.round(value * 10) % 20 === 0) ? (Math.round(value * 100) / 100).toFixed(1): null }
                    contentInset={{ left: 25, right: 25 }}
                />) : (<></>) } */}
            </View>
        )
    }
}

mapStateToProps = (state, ownProps) => {
    let storedData = state.plot_data;
    let plot_data = {};

    if (ownProps.colors.length !== ownProps.paths.length) {
        for (i in ownProps.paths) {
            ownProps.colors.push('rgba(134, 28, 176, 0.5)');
        }
    }

    for (path of ownProps.paths) {
        if (path in storedData) {
            plot_data[path] = storedData[path];
        }
        else {
            plot_data[path] = [{x: 0, y: 0}];
        }
    }

    return {
        ...ownProps,
        plot_data: plot_data,
    };
};

const mapDispatchToProps = {
    newData
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps)
}

ConnectedPlotMulti = connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlotMulti);
ConnectedPlotMulti.defaultProps = {
    plot_data: [],
    paths: [],
    colors: [],
    show_x: true
};

export default ConnectedPlotMulti;

