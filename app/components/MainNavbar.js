import { Actions, DefaultRenderer, NavBar, Button, Animated } from 'react-native-router-flux';
import React, { Component } from 'react';
import styles from '../styles';
import Menu from '../components/Menu';
import CustomNavBar from '../components/CustomNavBar';
import BottomPlayerBar from "../components/BottomPlayerBar";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';
import Drawer from 'react-native-drawer';

import Icon from 'react-native-vector-icons/FontAwesome';
import { DeviceEventEmitter, Navigator, Text, TouchableOpacity, View, TextInput } from 'react-native';
const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, top: 0, position: 'absolute', },
    main: { paddingLeft: 3, top: 0, position: 'absolute', },
}
class MainNavbar extends Component {
    constructor(props) {
        super(props);//this.state = { text: '' };
    }
    onOpen() {
        this._drawer.open();
    }
    closeDrawer = () => {
        this._drawer.close()
    };

    toggleTrack(tracks, trackIndex, playing) {
        this.props.toggleTrack(tracks, trackIndex, playing)
    }
    search(text) {
     console.log(this.props.category);
     console.log(text);  
    }
    
    render() {
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
                type="overlay"
                content={<Menu appinfo={this.props.profileResult} navProps={this.props} closeDrawer={this.closeDrawer} />}
                ref={(ref) => { this._drawer = ref; }}
                onOpen={() => Actions.refresh({ key: state.key, open: true })}
                onClose={() => Actions.refresh({ key: state.key, open: false })}
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                    main: { opacity: (2 - ratio) / 2 }
                })}>
                <CustomNavBar category={this.props.category} onPress={this.onOpen.bind(this)} onSearch={this.search.bind(this)} />
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(store) {
    return {
        profileResult: store.profileResult,
        category:store.category

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);