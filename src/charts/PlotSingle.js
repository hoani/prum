import React from 'react';
import { View } from 'react-native';

import PlotMulti from './PlotMulti';

class PlotSingle extends React.PureComponent {
    static defaultProps = {
        showX: false,
        showY: true,
        path: "",
        title: "",
        label: ""
    };

    render() {
        let { path, showX, showY, title, label } = this.props;
        let labels
        if (label == "") {
            labels = [];
        }
        else {
            labels = [label];
        }
        return (
            <View>
                <PlotMulti title={title} paths={[path]} showX={showX} showY={showY} labels={labels}/>
            </View>
        );
    }
}

export default PlotSingle;
