'use strict';

import React, { Component } from 'react';
import {
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
  Keyboard,
  View,
  Text,
} from 'react-native';

// --------------------------------------------------

const SCREEN_SIZE = Dimensions.get('window');
const INPUT_ACCESSORY_HEIGHT = 40;

// --------------------------------------------------

export default class InputAccessory extends Component {
  state = {
    visibleHeight: SCREEN_SIZE.height,
    opacity: 0,
  }
  // --------------------------------------------------
  componentWillMount() {
    this.keyboardDidShowListener = 
      Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    this.keyboardDidHideListener = 
      Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    const newSize = SCREEN_SIZE.height;
    this.setState({
      visibleHeight: newSize,
      opacity: 0,
    });
  }
  // --------------------------------------------------
  keyboardWillShow(e) {
    const newSize = e.endCoordinates.screenY - (INPUT_ACCESSORY_HEIGHT - 1);
    LayoutAnimation.configureNext({
      duration: 500,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY,
      },
    }); 
    this.setState({
      visibleHeight: newSize,
      opacity: 1,
    });
  }
  keyboardWillHide() {
    this.setState({
      visibleHeight: SCREEN_SIZE.height,
      opacity: 0,
    });
  }
  dismissKeyboardHandler() {
    LayoutAnimation.configureNext({
      duration: 100,
      create: {
        type: LayoutAnimation.Types.linear,
      },
      update: {
        type: LayoutAnimation.Types.linear,
      },
    });
    this.setState({
      visibleHeight: SCREEN_SIZE.height,
      opacity: 0,
    });
    Keyboard.dismiss();
  }
  // --------------------------------------------------
  render() {
    return (
      <View 
        style={[
          styles.InputAccessory,
          { opacity: this.state.opacity, top: this.state.visibleHeight - 1 },
        ]} 
      >
        <TouchableOpacity
          style={{ backgroundColor: '#f000' }}
          onPress={() => this.dismissKeyboardHandler()}
        >
          <Text style={[styles.InputAccessoryButtonText]}>
            {'Đóng bàn phím'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// --------------------------------------------------

const styles = StyleSheet.create({
  InputAccessory: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: INPUT_ACCESSORY_HEIGHT,
    backgroundColor: '#fff',
  },
  InputAccessoryButtonText: {
    paddingHorizontal: 9,
    paddingVertical: 12,
    marginLeft: 12,
    marginRight: 8,
    letterSpacing: 0.5,
    fontSize: 16,
    fontWeight: '400',
    color: '#316b6f',
    backgroundColor: 'transparent',
  },
});
