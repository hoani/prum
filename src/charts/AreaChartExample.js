import React from 'react'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
 
export default class AreaChartExample extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            data: [ 50, 30, -10, 20, 40, 95, -10, -4, -24, 0, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        };
    }

    componentDidMount(){
        // Toggle the state every second
        this.interval = setInterval(() => {
            this.setState((state, props) => {
                const { data } = this.state;
                const start = data.shift(1);
                data.push(start);
                console.log(data);
                return { data }
            });
            this.forceUpdate();
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    
 
    render() {
        const { data } = this.state;
 
        return (
            <AreaChart
                style={{ height: 200 }}
                data={ data }
                contentInset={{ top: 30, bottom: 30 }}
                curve={ shape.curveNatural }
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            >
                <Grid/>
            </AreaChart>
        )
    }
}