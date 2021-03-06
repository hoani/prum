import React from 'react';
import { Button } from 'react-native-elements';

class IconButton extends React.PureComponent {
    static defaultProps = {
        iconName:"glass",
        iconType:"font-awesome",
        title:"title not found",
        disabled:false,
        onPress:()=>{},
    };

    render() {
        return (
            <>
                <Button
                    icon={{
                        name: this.props.iconName,
                        type: this.props.iconType,
                    }}
                    containerStyle={{position: 'relative'}}
                    iconContainerStyle={{position: 'absolute', left: 10}}
                    title={this.props.title}
                    onPress={this.props.onPress}
                    style={this.props.style}
                    disabled={this.props.disabled}
                  />
            </>
        );
    }
}

export default IconButton;
