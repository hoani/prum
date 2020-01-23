import React from 'react'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

import { connect } from 'react-redux';

import { newData } from '../../reducer';

class AreaChartExample extends React.PureComponent {

    // constructor() {
    //     super();
    //     this.state = {
    //         data: [ 50, 30, -10, 20, 40, 95, -10, -4, -24, 0, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
    //     };
    // }

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

        return (
            <>
            <AreaChart
                style={{ height: 120 }}
                data={ x }
                contentInset={{ top: 10, bottom: 10 }}
                curve={ shape.curveNatural }
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            >
                <Grid/>
            </AreaChart>
            <AreaChart
                style={{ height: 120 }}
                data={ y }
                contentInset={{ top: 10, bottom: 10 }}
                curve={ shape.curveNatural }
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            >
                <Grid/>
            </AreaChart>
            <AreaChart
                style={{ height: 120 }}
                data={ z }
                contentInset={{ top: 10, bottom: 10 }}
                curve={ shape.curveNatural }
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            >
                <Grid/>
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