import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Path } from 'react-native-svg';

import { AreaChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import Legend from '../charts/legend'
import * as shape from 'd3-shape';

import { connect } from 'react-redux';

import { colors as styleColors } from "../style/style.js";

class PlotMulti extends React.PureComponent {

    render() {
        let { title, plotData, paths, colors, labels, height } = this.props;
        let { yMin, yMax } = this.props;
        let { showX, showY } = this.props;
        let yTicks = Math.floor(height/50) + 1;



        const PlotLine = ({ line, color }) => (
            <Path
                key={'line'}
                d={line}
                stroke={color}
                fill={'none'}
            />
        );

        let axis_data = Array();
        if (paths.length > 0 && paths[0] in plotData) {
            axis_data = plotData[paths[0]];
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
                    showY ?
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
                        numberOfTicks={yTicks}
                        formatLabel={(value) => `${value}`}
                    /> :
                    <></>
                    }
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        {
                        paths.map((path, index) => {
                            let data = (path in plotData) ? plotData[path] : [];
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
                            { (showX && axis_data.length > 0) ? (
                                <View style={{justifyContent: "flex-end", height:"100%"}}>
                                    <XAxis
                                        style={{ marginHorizontal: -10, marginTop: 5}}
                                        data={ axis_data }
                                        yAccessor={ ({ item }) => item.y }
                                        xAccessor={ ({ item }) => item.x }
                                        formatLabel={ (value, index) => (Math.round(value * 10) % 20 === 0) ? (Math.round(value * 100) / 100).toFixed(1): null }
                                        contentInset={{ left: 25, right: 25 }}
                                        svg = {{fontSize:14, fill: styleColors.tNormal}}
                                    />
                                </View>) :
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
    let plotData = Object.assign({}, ownProps.plotData);

    let yData = [];

    let update = false;

    if (ownProps.colors.length !== ownProps.paths.length) {
        update = true;
        for (i in ownProps.paths) {
            const color = DEFAULT_COLORS[i % DEFAULT_COLORS.length];
            ownProps.colors.push(color);
        }
    }

    for (let path of ownProps.paths) {
        if (path in storedData) {
            if (path in plotData) {
                if (storedData[path] != plotData[path]) {
                    update = true;
                }
            }
            else {
                update = true;
            }
            update = true;
            plotData[path] = storedData[path];

        }
        else {
            plotData[path] = [{x: 0, y: 0}];
        }
        const yValues = plotData[path].map(item => item.y);
        yData = yData.concat(yValues);
    }



    if (update) {
        let yMax = 0.0;
        let yMin = 0.0;

        if (yData.length != 0) {
            yMax = Math.max(...yData);
            yMin = Math.min(...yData);
        }

        let newProps = {
            ...ownProps,
            yMax: yMax,
            yMin: yMin,
            plotData: plotData,
        }

        return newProps;
    }
    else {
        return ownProps;
    }
};

ConnectedPlotMulti = connect(mapStateToProps)(PlotMulti);
ConnectedPlotMulti.defaultProps = {
    plotData: {},
    paths: [],
    colors: [],
    showX: true,
    showY: true,
    title: "",
    labels: [],
    height: 200,
    yMin: 0.0,
    yMax: 0.0,
};

export default ConnectedPlotMulti;

