import React from 'react';
import { View } from 'react-native';

import PlotMulti from './PlotMulti';

class PlotSingle extends React.PureComponent {
    static defaultProps = {
        show_x: false,
        path: "",
        title: ""
    };

    render() {
        let { path, show_x } = this.props;
        return (
            <View>
                <PlotMulti title={title} paths={[path]} show_x={show_x}/>
            </View>
        );
    }
}

export default PlotSingle;
