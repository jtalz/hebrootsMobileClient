import React, { Component } from 'react';
import { View } from 'react-native';
import RoundCustomButton from './RoundCustomButton';

class QuickPlayButton extends Component {
    shouldComponentUpdate(nextProps) {
      if (nextProps.name !== this.props.name) {
        return true;
      } else {
        return false;
      }
    }
    render() {
      return (
        <View>
          <RoundCustomButton
            name={this.props.name}
            translation={this.props.translation}
            imgUrl={this.props.imgUrl}
            onPress={this.props.onPress}
          />
        </View>
      );
    }
  }

  export default QuickPlayButton;