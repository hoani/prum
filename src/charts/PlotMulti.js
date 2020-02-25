import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Path } from 'react-native-svg';

import { AreaChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import Legend from './Legend'
import * as shape from 'd3-shape';

import { connect } from 'react-redux';

import { newData } from '../state/reducer';

import { colors as styleColors } from "../style/style.js";

class PlotMulti extends React.PureComponent {

    render() {
        let { title, plot_data, paths, colors, labels, height } = this.props;
        let { yMin, yMax } = this.props;
        let { show_x, show_y } = this.props;

        const PlotLine = ({ line, color }) => (
            <Path
                key={'line'}
                d={line}
                stroke={color}
                fill={'none'}
            />
        );

        let axis_data = Array();
        if (paths.length > 0 && paths[0] in plot_data) {
            axis_data = plot_data[paths[0]];
        }

        return (
            <View style={ { height: height, flex: 1, flexDirection: "column" } }>
                {
                title !== "" ?
                <View style={ {
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize:20,
                            fontWeight:"bold",
                            color: styleColors.tEmphasis
                        }}
                    >
                    {title}
                    </Text>
                </View> :
                <></>
                }
                { labels.length > 0 ?
                    <Legend
                        labels={labels}
                        colors={colors}
                    /> :
                    <></>
                }

                <View style={ { flex: 1, flexGrow: 1, flexDirection: 'row' } }>
                    {
                    show_y ?
                    <YAxis
                        style={{paddingLeft:5}}
                        data = {[yMin, yMax]}
                        min={yMin}
                        max={yMax}
                        svg={{
                            fill: styleColors.tNormal,
                            fontSize: 14,
                            marginLeft: 5,
                        }}
                        contentInset={ { top: 10, bottom: 10 } }
                        numberOfTicks={6}
                        formatLabel={(value) => `${value}`}
                    /> :
                    <></>
                    }
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        {
                        paths.map((path, index) => {
                            let data = (path in plot_data) ? plot_data[path] : [];
                            return (
                                <AreaChart
                                    key={path}
                                    style={ { ...StyleSheet.absoluteFill} }
                                    data={ data }
                                    svg={{ fill: colors[index]+"10" }}
                                    contentInset={ { top: 10, bottom: 10 } }
                                    curve={ shape.curveLinear }
                                    yAccessor={ ({ item }) => item.y }
                                    xAccessor={ ({ item }) => item.x }
                                    yMin = {yMin}
                                    yMax = {yMax}
                                >
                                    {(index === 0) ? (<Grid/>) : <></>}
                                    <PlotLine color={colors[index]}/>
                                </AreaChart>
                            )
                        })
                        }
                            { (show_x && axis_data.length > 0) ? (
                                <View style={{justifyContent: "flex-end", height:"100%"}}>
                            <XAxis
                                style={{ marginHorizontal: -10, marginTop: 5}}
                                data={ axis_data }
                                yAccessor={ ({ item }) => item.y }
                                xAccessor={ ({ item }) => item.x }
                                formatLabel={ (value, index) => (Math.round(value * 10) % 20 === 0) ? (Math.round(value * 100) / 100).toFixed(1): null }
                                contentInset={{ left: 25, right: 25 }}
                                svg = {{fontSize:14, fill: styleColors.tNormal}}
                            /></View>) :
                            <></>
                            }
                    </View>
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
    let storedData = state.data.plot;
    let plot_data = {};

    let yMax = null;
    let yMin = null;

    let yData = [];

    let update = false;

    if (ownProps.colors.length !== ownProps.paths.length) {
        update = true;
        for (i in ownProps.paths) {
            const color = DEFAULT_COLORS[i % DEFAULT_COLORS.length];
            ownProps.colors.push(color);
        }
    }



    for (path of ownProps.paths) {
        if (path in storedData) {
            update = true;
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

    if (update) {
        return {
            ...ownProps,
            yMax,
            yMin,
            plot_data,
        };
    }
    return ownProps;
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
    show_x: true,
    show_y: true,
    title: "",
    labels: [],
    height: 200,
};

export default ConnectedPlotMulti;

