import React from 'react'
import { ProgressCircle }  from 'react-native-svg-charts';
import { Icon } from 'react-native-elements';


import { connect } from 'react-redux';

import { newData } from '../state/reducer';

class ProgressCircleIcon extends React.PureComponent {
    static defaultProps = {
        value: 0.0,
        offset: 0.0,
        multiplier: 1.0,
        iconColors: ['#f50', '#2c2'],
        iconNames: ["heart", "plug"],
        iconTypes: ["font-awesome", "font-awesome"],
        iconIntervals: [0.4, 100.0],
        path: "",
        height: 120
    };

    render() {
        let { height, value, iconColors, iconNames, iconTypes, iconIntervals } = this.props;
        let iconName = "question";
        let iconType = "font-awesome";
        let iconColor = "#FFF";

        for (let i = 0; i < iconIntervals.length; i+=1) {
            if (value <= iconIntervals[i]) {
                iconName = iconNames[i];
                iconType = iconTypes[i];
                iconColor = iconColors[i];
                break;
            }
        }

        return (
            <>
                <ProgressCircle
                    style={ { height } }
                    progress={ value }
                    data={ value}
                    strokeWidth={10}
                    progressColor={'rgb(134, 65, 244)'}
                />
                <Icon
                    name={iconName}
                    type={iconType}
                    size={height/2}
                    color={iconColor}
                    containerStyle ={{
                        alignSelf:'center',
                        position:'absolute',
                        top: height/4
                    }}
                />
            </>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    let storedData = state.current_data;
    return {
        value: storedData[ownProps.path]* ownProps.multiplier,
    };
};

const mapDispatchToProps = {
    newData
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressCircleIcon);
