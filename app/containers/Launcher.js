/**
 * Launch Screen
 *  - Shows a nice loading screen whilst:
 *  - Checking if user is logged in, and redirects from there
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionCreators from '../actions';
import Styles from '../styles';
// Consts and Libs

let {height, width} = Dimensions.get('window');
/* Styles ==================================================================== */
const styles = StyleSheet.create({
  launchImage: {
    width: width-20,
    height: height-20,
  },
});

/* Component ==================================================================== */
class AppLaunch extends Component {
  static componentName = 'AppLaunch';
  componentWillMount = () => {
    this.props.fetchData();
    this.props.syncData();
  }

 componentWillReceiveProps(nextProps){
     if(nextProps.profileResult.profile!=undefined){
        Actions.home({'profileResult':nextProps.profileResult,'category':nextProps.profileResult.categories[0]});
     }
  }

  render(){
    if(this.props.profileResult==null || this.props.profileResult.length==0)
         return null;

    return (<View style={[Styles.container]}>
      <Image
        source={require('../img/launch.jpg')}
        style={[styles.launchImage, Styles.containerCentered]}
      >
        <ActivityIndicator
          animating
          size={'large'}
          color={'#C1C5C8'}
        />
      </Image>
    </View>
  );
}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(store) {
    return {
      profileResult: store.profileResult,
  
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppLaunch);
