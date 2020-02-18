import React from 'react';
import { View } from 'react-native';

import PlotMulti from './PlotMulti';

class PlotSingle extends React.PureComponent {
    static defaultProps = {
        show_x: false,
        path: "",
        title: "",
        label: ""
    };

    render() {
        let { path, show_x, title, label } = this.props;
        let labels
        if (label == "") {
            labels = [];
        }
        else {
            labels = [label];
        }
        return (
            <View>
                <PlotMulti title={title} paths={[path]} show_x={show_x} labels={labels}/>
            </View>
        );
    }
}

export default PlotSingle;
