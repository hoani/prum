import React from 'react';
import { View } from 'react-native';

import PlotMulti from '../charts/plotMulti';

class Plot3DOF extends React.PureComponent {
    static defaultProps = {
        showX: false,
        showY: true,
        paths: ["", "", ""],
        title: "",
        height: 200,
        labels: []
    };

    render() {
        let { paths, showX, showY, title, labels, height } = this.props;
        return (
            <View>
                <PlotMulti title={title} paths={paths} showX={showX} showY={showY} labels={labels}
                    height={height}
                    colors={['#008b8b', '#1e90ff','#dc143c']}
                />
            </View>
        );
    }
}

export default Plot3DOF;
