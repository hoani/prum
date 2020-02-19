import React from 'react';
import { View } from 'react-native';

import PlotMulti from './PlotMulti';

class Plot3DOF extends React.PureComponent {
    static defaultProps = {
        show_x: false,
        show_y: true,
        paths: ["", "", ""],
        title: "",
        labels: []
    };

    render() {
        let { paths, show_x, show_y, title, labels } = this.props;
        return (
            <View>
                <PlotMulti title={title} paths={paths} show_x={show_x} show_y={show_y} labels={labels}/>
            </View>
        );
    }
}

export default Plot3DOF;
