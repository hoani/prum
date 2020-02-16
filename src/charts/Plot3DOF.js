import React from 'react';
import { View } from 'react-native';

import PlotMulti from './PlotMulti';

class Plot3DOF extends React.PureComponent {
    static defaultProps = {
        show_x: false,
        paths: ["", "", ""],
        title: title
    };

    render() {
        let { paths, show_x, title } = this.props;
        return (
            <View>
                <PlotMulti title={title} paths={paths} show_x={show_x}/>
            </View>
        );
    }
}

export default Plot3DOF;
