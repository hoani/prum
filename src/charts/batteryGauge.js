import React from 'react'

import { connect } from 'react-redux';

import { colors as styleColors } from "../style/style.js";
import ProgressCircle from '../charts/progressCircle';

class BatteryGauge extends React.PureComponent {

    render() {
        let { height, path } = this.props;
        let { rawValue, emptyVoltage, fullVoltage } = this.props;

        let multiplier = 0;
        let offset = 0;
        if (rawValue < emptyVoltage) {
            multiplier = 0;
        }
        else if (rawValue > fullVoltage) {
            multiplier = 1;
            offset = rawValue - 1;
        }
        else {
            multiplier = 1/(fullVoltage - emptyVoltage);
            offset = emptyVoltage;
        }



        return (
            <>
                <ProgressCircle
                    height = {height}
                    path = {path}
                    multiplier={multiplier}
                    offset = {offset}
                    textMultiplier={1.0}
                    textUnit="V"
                    fontSizePercent={80}
                    iconNames={['battery-0', 'battery-1', 'battery-2', 'battery-3', 'battery-4']}
                    iconTypes={['font-awesome', 'font-awesome', 'font-awesome', 'font-awesome', 'font-awesome']}
                    iconColors={['#822', '#a82', '#6a2', '#492', '#282' ]}
                    iconIntervals={[6.5, 7.0, 7.4, 7.8, 10.0 ]}
                    barColors={['#a33', '#da3', '#8d3', '#5b3', '#3a3' ]}
                    barIntervals={[6.5, 7.0, 7.4, 7.8, 10.0 ]}
                    decimalPlaces={1}
                />
            </>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    let storedData = state.data.current;
    return {
        rawValue: storedData[ownProps.path],
    };
};

const connectedBatteryGauge = connect(mapStateToProps)(BatteryGauge);

connectedBatteryGauge.defaultProps = {
    height: 120,
    emptyVoltage: 6.4,
    fullVoltage: 8.4,
    rawValue: 0.0,
    path: "",
};

export default connectedBatteryGauge;
