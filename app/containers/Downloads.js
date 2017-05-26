import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';
import Styles from '../styles';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Actions } from 'react-native-router-flux';
import Track from '../components/Track';


class Downloads extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  onPlayPress(index, playing) {
    if (playing == undefined)
      playing = false;

    this.props.onPlayPress(this.props.tracks, index, !playing);
    this.setState({ currentTrack: this.props.tracks[index], trackIndex: index, playing: !playing });
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.tracks && nextProps.currentTrack.trackIndex >= 0 && nextProps.currentTrack.playing != undefined) {
      if (this.state.id != nextProps.currentTrack.tracks[nextProps.currentTrack.trackIndex].id || this.state.playing != nextProps.currentTrack.playing) {
        for (var i = 0; i < nextProps.tracks.length; i++) {
          if (nextProps.tracks[i].id == nextProps.currentTrack.tracks[nextProps.currentTrack.trackIndex].id) {
            nextProps.tracks[i].playing = nextProps.currentTrack.playing;
            this.setState({ id: nextProps.currentTrack.tracks[nextProps.currentTrack.trackIndex].id, trackIndex: nextProps.currentTrack.trackIndex, playing: nextProps.currentTrack.playing });
          } else
            nextProps.tracks[i].playing = false
        }
      }
    }
  }


  deleteTrack(index) {
    this.props.deleteTrack(index, this.props.tracks[index]);
  }

  componentWillMount() {
    console.log('Search.profileResult',this.props);
    // this.queryText = this.props.searchText;
    this.props.getTracks(this.props.category);
    // this.props.fetchData();

  }

  render() {
     console.log('In Download ', this.props.tracks)
    if (this.props.tracks != undefined) {
      return (
        <ScrollView containerStyle={[Styles.homeContainer, Styles.noPaddingHorizontal]}>
          {
            this.props.tracks.map((track, index) => {
              return <Track
                key={index}
                onPlayPress={this.onPlayPress.bind(this,  index, track.playing)}
                track={track}
                playing={track.playing}
                deleteTrack={this.deleteTrack.bind(this, index)}
              />
            })
          }
        </ScrollView>
      );
    } else {
      return (<ScrollView />);
    }
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(store) {
  return {
    tracks: store.tracks,
    currentTrack: store.currentTrack,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Downloads);










