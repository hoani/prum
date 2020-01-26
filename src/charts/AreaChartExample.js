import React from 'react';
import { View } from 'react-native';
import { Path } from 'react-native-svg';

import { AreaChart, Grid, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import { connect } from 'react-redux';

import { newData } from '../../reducer';
import PlotSingle from './PlotSingle';

class AreaChartExample extends React.PureComponent {
    static defaultProps = {
        x: [],
        y: [],
        z: [],
      };




    componentDidMount(){
        // // Toggle the state every second
        // this.interval = setInterval(() => {
        //     this.props.newData(this.props.data[0])
        //     // this.setState((state, props) => {
        //     //     const { data } = this.state;
        //     //     const start = data.shift(1);
        //     //     data.push(start);
        //     //     console.log(data);
        //     //     return { data }
        //     // });
        //     //this.forceUpdate();
        // }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let { x, y, z } = this.props;

        const Line = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={'rgb(134, 65, 244)'}
                fill={'none'}
            />
        );

        const colors = [ 'rgb(138, 0, 230, 0.8)', 'rgb(173, 51, 255, 0.8)', 'rgb(194, 102, 255, 0.8)', 'rgb(214, 153, 255, 0.8)' ]
        const keys   = [ 'apples', 'bananas', 'cherries', 'dates' ]

        return (
            <>
            <View>
            <PlotSingle path = "imu/gyros/y" />
            <AreaChart
                style={{ height: 120 }}
                data={ x }
                contentInset={{ top: 10, bottom: 0 }}
                curve={ shape.curveLinear }
                svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
                yAccessor={ ({ item }) => item.y }
                xAccessor={ ({ item }) => item.x }
            >
                <Grid/>
                <Line/>
            </AreaChart>
            <XAxis
                style={{ marginHorizontal: -10, marginTop: 15}}
                data={ x }
                yAccessor={ ({ item }) => item.y }
                xAccessor={ ({ item }) => item.x }
                formatLabel={ (value, index) => (Math.round(value * 10) % 20 === 0) ? (Math.round(value * 100) / 100).toFixed(1): null }
                contentInset={{ left: 25, right: 25 }}
            />
        </View>
            <AreaChart
                style={{ height: 120 }}
                data={ y }
                contentInset={{ top: 10, bottom: 10 }}
                curve={ shape.curveNatural }
                svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
                yAccessor={ ({ item }) => item.y }
                xAccessor={ ({ item }) => item.x }
            >
                <Grid/>
                <Line/>
            </AreaChart>
            <AreaChart
                style={{ height: 120 }}
                data={ z }
                contentInset={{ top: 10, bottom: 10 }}
                curve={ shape.curveLinear }
                svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
                yAccessor={ ({ item }) => item.y }
                xAccessor={ ({ item }) => item.x }
            >
                <Grid/>
                <Line/>
            </AreaChart>
            </>
        )
    }
}

const mapStateToProps = state => {
    let storedData = state.plot_data;
    return {
        x: storedData["imu/accel/x"],
        y: storedData["imu/accel/y"],
        z: storedData["imu/accel/z"],
    };
};

const mapDispatchToProps = {
    newData
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaChartExample);
