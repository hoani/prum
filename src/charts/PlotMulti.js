import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Path } from 'react-native-svg';

import { AreaChart, Grid, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import { connect } from 'react-redux';

import { newData } from '../state/reducer';

class PlotMulti extends React.PureComponent {

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let { plot_data, paths, colors, show_x, yMin, yMax } = this.props;

        const Line = ({ line, color }) => (
            <Path
                key={'line'}
                d={line}
                stroke={color}
                fill={'none'}
            />
        );

        const axis_data = plot_data[paths[0]];

        return (
            <View style={ { height: 200 } }>
                <View style={ { height: 120 } }>
                {
                    paths.map((path, index) => {
                        return (
                            <AreaChart
                                key={path}
                                style={ StyleSheet.absoluteFill }
                                data={ plot_data[path] }
                                svg={{ fill: colors[index]+"10" }}
                                contentInset={ { top: 10, bottom: 10 } }
                                curve={ shape.curveNatural }
                                yAccessor={ ({ item }) => item.y }
                                xAccessor={ ({ item }) => item.x }
                                yMin = {yMin}
                                yMax = {yMax}
                            >
                                {(index === 0) ? (<Grid/>) : <></>}
                                <Line color={colors[index]}/>
                            </AreaChart>
                        )
                    })
                }
                </View>
                <View>  
                    { (show_x && axis_data.length > 0) ? (
                    <XAxis
                        style={{ marginHorizontal: -10, marginTop: 5}}
                        data={ axis_data }
                        yAccessor={ ({ item }) => item.y }
                        xAccessor={ ({ item }) => item.x }
                        formatLabel={ (value, index) => (Math.round(value * 10) % 20 === 0) ? (Math.round(value * 100) / 100).toFixed(1): null }
                        contentInset={{ left: 25, right: 25 }}
                        svg = {{fontSize:16, fill:'grey'}}
                    />) : 
                    <></> 
                    }
                </View>
            </View>
        )
    }
}

const DEFAULT_COLORS = [
    '#008b8b',
    '#1e90ff',
    '#dc143c',
    '#ff8c00',
    '#a9a9a9',
    '#8a2be2',
    '#ff1493',
    '#daa520',
    '#4b0082',
    '#ee82ee'
];

mapStateToProps = (state, ownProps) => {
    let storedData = state.plot_data;
    let plot_data = {};

    let yMax = null;
    let yMin = null;

    let yData = [];

    if (ownProps.colors.length !== ownProps.paths.length) {
        for (i in ownProps.paths) {
            const color = DEFAULT_COLORS[i % DEFAULT_COLORS.length];
            ownProps.colors.push(color);
        }
    }

    for (path of ownProps.paths) {
        if (path in storedData) {
            plot_data[path] = storedData[path];
            
            const yValues = plot_data[path].map(item => item.y);
            yData = yData.concat(yValues);
        }
        else {
            plot_data[path] = [{x: 0, y: 0}];
        }
    }

    if (yData.length == 0) {
        yMin = 0.0;
        yMax = 0.0;
    }
    else {
        yMax = Math.max(...yData);
        yMin = Math.min(...yData);
    }

    return {
        ...ownProps,
        yMax,
        yMin,
        plot_data,
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

