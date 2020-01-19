import React from 'react'
import { ProgressCircle }  from 'react-native-svg-charts'
 
export default class ProgressCircleExample extends React.PureComponent {
 
    render() {
 
        return (
            <ProgressCircle
                style={ { height: 120 } }
                progress={ 0.8 }
                strokeWidth={10}
                progressColor={'rgb(134, 65, 244)'}
            />
        )
    }
 
}
