import { NavBar, Button, Animated } from 'react-native-router-flux';
import React, { Component } from 'react';
import styles from '../styles';


import Icon from 'react-native-vector-icons/FontAwesome';
import { DeviceEventEmitter, Navigator, Text, TouchableOpacity, View, TextInput } from 'react-native';
export default class CustomNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    _renderLeftButton() {
        return (
            <TouchableOpacity
                onPress={() => this.props.onPress()} style={styles.headerLeft}>
                <Icon name='bars' size={20} color='#FFF' />
            </TouchableOpacity>
        );


    }
    _renderRightButton() {
        return (
            <TouchableOpacity style={styles.headerRight} >
                <Icon name='ellipsis-v' size={20} color={'#FFF'} />
            </TouchableOpacity>
        )
    }
    _renderTitle() {
        return (
            <View style={styles.headerTitle}>
                <View style={styles.searchBox}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="Search"
                        onChangeText={(value) => { this.setState({ text: value }) }}
                        value={this.state.text}
                        maxLength={100}
                        placeholderTextColor={'#FFF'}
                        style={styles.searchBoxInput}
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
                    <TouchableOpacity style={styles.searchBoxIcon} onPress={() => this.props.onSearch(this.state.text)}>
                        <Icon name='search' size={20} color={'#FFF'} />
                    </TouchableOpacity>
                </View>

            </View>

        );
    }

    render() {
        const state = this.props.navigationState;
        return (
            <View
                style={[styles.header]}>
                {this._renderLeftButton()}
                {this._renderTitle()}
                {this._renderRightButton()}
            </View>
        );
    }
}