import { NavBar, Button, Animated } from 'react-native-router-flux';
import React, { Component } from 'react';
import styles from '../styles';


import Icon from 'react-native-vector-icons/FontAwesome';
import { DeviceEventEmitter, Navigator, Text, TouchableOpacity, View, TextInput } from 'react-native';
export default class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }



    render() {

        return (
            <View>
                <Text>
                    If you like React on the web, you'll like React Native.
        </Text>
                <Text>
                    You just use native components like 'View' and 'Text',
          instead of web components like 'div' and 'span'.
        </Text>
            </View>
        );
    }
}