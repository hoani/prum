import React from 'react';
import { Text, View } from 'react-native';

import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';

import { connect } from 'react-redux';

import { colors as styleColors, colors } from "../style/style.js";

class PlotBar extends React.PureComponent {

    render() {
        let { currentData, colors, height } = this.props;
        let { yMin, yMax } = this.props;
        let { showX, showY } = this.props;



        return (
            <View style={ { height: height, flex: 1, flexDirection: "column" } }>

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
                        numberOfTicks={3}
                        formatLabel={(value) => `${value}`}
                    /> :
                    <></>
                    }
                    <View style={{ flex: 1, marginLeft: 10 }}>

                        <BarChart
                            style={{ height: height }}
                            data={currentData}
                            svg={{ fill: colors[0] }}
                            contentInset={{ top: 30, bottom: 30 }}
                            yMin = {-1.0}
                            yMax = {1.0}
                            yAccessor={({ item }) => item.value}
                        >
                            <Grid />
                        </BarChart>
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

mapStateToProps = (state, ownProps) => {
    let newData = Object.assign({}, ownProps.currentData);

    if (newData != ownProps.paths.length) {
        const defaultEntry = {
            value: 0.0,
            svg: { fill: styleColors.p200,},
        }
        newData = new Array(ownProps.paths.length)
            .fill()
            .map(u => JSON.parse(JSON.stringify(defaultEntry)));
    }


    for (let i in ownProps.paths) {
        let path = ownProps.paths[i];

        if (path in state.data.current) {
            const iColor = i % ownProps.colors.length;
            const value = state.data.current[path]
            newData[i].value = value;
            newData[i].svg.fill = ownProps.colors[iColor];
            if (value < 0) {
                newData[i].svg.fill += "b0"
            }
        }
    }

    let newProps = {
        ...ownProps,
        currentData: newData,
    }

    return newProps;
};

ConnectedPlotBar = connect(mapStateToProps)(PlotBar);
ConnectedPlotBar.defaultProps = {
    currentData: [],
    paths: [],
    colors: [styleColors.p100],
    showY: true,
    title: "",
    labels: [],
    height: 200,
    yMin: -1.0,
    yMax: 1.0,
};

export default ConnectedPlotBar;

