import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';
import Styles from '../styles';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SearchResults from './SearchResults';


class Search extends Component {
  
  state = { searchQuery: '' }

  componentWillMount() {
    this.props.searchTrack(this.props.catergory_index, this.state.searchQuery);
  }
  

  componentWillReceiveProps(nextProps) {
   
    if (nextProps.searchText != this.state.searchQuery) {
      this.state.searchQuery = nextProps.searchText;
       this.props.searchTrack(nextProps.catergory_index, nextProps.searchText);
    }
  }
  render() {
    return (
      <View style={Styles.homeContainer}>
        <SearchResults catergory_index={this.props.catergory_index} onPlayPress={this.props.onPlayPress.bind(this)}/>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(store) {
  return {
     results: store.searchResults,
    progress: store.progress,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);