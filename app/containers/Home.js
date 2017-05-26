import React, { Component } from 'react';

import {
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  Platform, StatusBar
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';
import Styles from '../styles';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import * as Progress from 'react-native-progress';
import Downloads from './Downloads';
import SearchResults from './SearchResults';
import BottomPlayerBar from "../components/BottomPlayerBar";




class Home extends Component {
  _drawer;


  constructor(props) {
    super(props);
    this.state = { text: '' };
  }


  onPlayPress(tracks, index, playing) {
    Actions.refresh({ tracks: tracks, trackIndex: index })

    this.props.toggleTrack(tracks, index, playing)

  }

  deleteTrack(index, track) {
    this.props.deleteTrack(index, track);
  }

  search(text) {
    this.setState({ text })
  }
  onTabChange(obj) {
    //TODO need to implement

  }




  render() {
    if (this.state.trackIndex > -1)
      return null;
     console.log(this.props.currentTrack) 
    return (
      <View style={{ flex: 1 }}>
        <ScrollableTabView

          style={{ marginTop: 50, marginBottom: this.props.currentTrack.tracks?80:0 }}
          locked={true}
          tabBarUnderlineStyle={{ backgroundColor: "#205b35" }}
          tabBarActiveTextColor="#000"
          initialPage={Platform.OS == 'ios' ? 1 : 0}
          onChangeTab={this.onTabChange.bind(this)}
        >
          
          <Downloads
            tabLabel="Downloads"
            onPlayPress={this.onPlayPress.bind(this)}
            category={this.props.category}
            tracks={this.props.tracks}
            deleteTrack={this.deleteTrack.bind(this)}
          />
          <SearchResults
            tabLabel="Search"
            category={this.props.category}
            progress={this.props.progress}
            onPlayPress={this.onPlayPress.bind(this)}
            searchText={this.state.text}
          />
        </ScrollableTabView>
        <BottomPlayerBar />
      </View>



    );
  }
}

const drawerStyles = {
  drawer: {},
  main: {
    paddingRight: 3
  },
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
function mapStateToProps(store) {
  return {
    profileResult: store.profileResult,
    progress: store.progress,
    currentTrack: store.currentTrack,

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
