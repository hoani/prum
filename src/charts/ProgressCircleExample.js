import React from 'react'
import { ProgressCircle }  from 'react-native-svg-charts';


import { connect } from 'react-redux';

import { newData } from '../../reducer';

class ProgressCircleExample extends React.PureComponent {

    render() {
        let { value } = this.props;
        value += 0.5

        return (
            <ProgressCircle
                style={ { height: 120 } }
                progress={ value }
                strokeWidth={10}
                progressColor={'rgb(134, 65, 244)'}
            />
        )
    }

}

const mapStateToProps = state => {
    let storedData = state.current_data;
    return {
        value: storedData["health/os/cpuse"],
    };
};

const mapDispatchToProps = {
    newData
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressCircleExample);
