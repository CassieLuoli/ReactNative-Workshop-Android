/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import EditText from './js/EditText.js';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Alert,
} from 'react-native';

var { NativeModules } = require('react-native');
var { DeviceEventEmitter } = require('react-native');

class SampleAppMovies extends Component {
  showToast() {
    NativeModules.ToastAndroid.show("Awesome!!!We call Native from JS", ToastAndroid.SHORT);
  }

  callbackFromNative() {
    NativeModules.ToastAndroid.measureLayout((msg)=>{
        console.log("callbackFromNative error");
    }, (x, y, width, height) => {
      Alert.alert("callbackFromNative toast poit: "+x + '坐标,' + y + '坐标,' + width + '宽,' + height+'高');
    })
  }

  triggerEventFromNative(){
    NativeModules.ToastAndroid.triggerDelayedEvent();
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('DelayedEvent', function(e: Event) {
      Alert.alert("Event Received!!!");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions} onPress={this.showToast}>
          call natvie module from JS
        </Text>
        <Text style={styles.instructions} onPress={this.callbackFromNative}>
          callback From Native
        </Text>
        <EditText hint="hello" style={styles.edittext}/>
        <Text style={styles.instructions} onPress={this.triggerEventFromNative}>
          Trigger Event From Native
        </Text>

      </View>
    );
  }


}

const styles = StyleSheet.create({
  edittext:{
    width:200,
    height:80,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('SampleAppMovies', () => SampleAppMovies);
