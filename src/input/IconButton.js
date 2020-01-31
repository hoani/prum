import React from 'react';
import { Button } from 'react-native-elements';

class IconButton extends React.PureComponent {
    static defaultProps = {
        iconName:"glass",
        iconType:"font-awesome",
        iconColor:"#fff",
        title:"title not found",
        onPress:()=>{},
    };

    render() {
        return (
            <>
                <Button
                    icon={{
                        name: this.props.iconName,
                        type: this.props.iconType,
                        color: this.props.iconColor,
                    }}
                    containerStyle={{position: 'relative'}}
                    iconContainerStyle={{position: 'absolute', left: 10}}
                    title={this.props.title}
                    onPress={this.props.onPress}
                  />
            </>
        );
    }
}

export default IconButton;
