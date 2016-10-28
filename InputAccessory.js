'use strict';

import React, {
  View,
  DeviceEventEmitter,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
  Text
} from 'react-native';
const dismissKeyboard = require('dismissKeyboard');
var INPUT_ACCESSORY_HEIGHT = 40;

var InputAccessory = React.createClass({
  getInitialState: function() {
    return {
      visibleHeight: Dimensions.get('window').height,
      opacity:0
    };
  },

  //For some reason, this gives warnings?
  componentWillMount () {
    const Keyboard = require('Keyboard')
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  },

  componentWillUnmount(){
    // console.log('componentWillUnmount');
    let newSize = Dimensions.get('window').height
    this.setState({
      visibleHeight: newSize,
      hideKA: true,
      opacity: 0
    })
    // dismissKeyboardHandler();
  },

  keyboardWillShow (e) {
    var newSize = e.endCoordinates.screenY - (INPUT_ACCESSORY_HEIGHT-1); //-1 so 1px is showing so it doesn't unmount
    LayoutAnimation.configureNext({
      duration:500,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY
      },
    });
    
    this.setState({
      visibleHeight: newSize,
      hideKA: false,
      opacity:1,
    })
  },

  rotateDevice: function() {
    return false;
  },

  keyboardWillHide (e) {
    // console.log('keyboardWillHide');
    let newSize = Dimensions.get('window').height
    this.setState({
      visibleHeight: Dimensions.get('window').height,
      hideKA: true,
      opacity:0,
    })
  },

  dismissKeyboardHandler: function(){
    LayoutAnimation.configureNext({
      duration:100,
      create: {
        type: LayoutAnimation.Types.linear,
      },
      update: {
        type: LayoutAnimation.Types.linear,
      },
    });

    let newSize = Dimensions.get('window').height
    this.setState({
      visibleHeight: newSize,
      hideKA: true,
      opacity:0,
    })
    // console.log('dismissKeyboard',dismissKeyboard());
    dismissKeyboard();
  },

  render: function(){
      return (
        <View style={[s.InputAccessory,{opacity:this.state.opacity,top:this.state.visibleHeight-1}]} onLayout={(e)=>this.rotateDevice(e)}>
            <TouchableOpacity
              onPress={() => this.dismissKeyboardHandler()}>
              <Text style={[s.InputAccessoryButtonText]}>
                Done
              </Text>
            </TouchableOpacity>
        </View>
      )
  }
});

var s = StyleSheet.create({
  InputAccessory: {
    alignItems:'flex-end',
    backgroundColor:'#FFF',
    height:INPUT_ACCESSORY_HEIGHT,
    position:'absolute',
    left:0,
    right:0,
  },
  InputAccessoryButtonText: {
    fontSize: 17,
    letterSpacing: 0.5,
    color: '#316b6f',
    backgroundColor:'transparent',
    paddingHorizontal:9,
    paddingVertical:9,
  },
});


module.exports = InputAccessory;
