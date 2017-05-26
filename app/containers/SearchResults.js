import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';
import Styles from '../styles';

import Track from '../components/Track';
import * as Utils from '../helpers/utils';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: '' }
  }

  componentWillMount() {
    this.props.searchTrack(this.props.category, this.state.searchQuery);
  }
  onDownloadPress(track) {
    this.props.downloadAudio(this.props.category, track);
  }

  onPlayPress(track, index, playing) {
    if (playing == undefined)
      playing = false;
    let downloadedTrackIndex = 0;
    for (var i = 0; i < this.props.tracks.length; i++) {
      if (this.props.searchResults[index].id == this.props.tracks[i].id) {
        downloadedTrackIndex = i;
        break;
      }
    }

    this.props.onPlayPress(this.props.tracks, downloadedTrackIndex, !playing);
    this.setState({ currentTrack: this.props.searchResults[index], trackIndex: index, playing: !playing });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentTrack.tracks && nextProps.currentTrack.trackIndex >= 0 && nextProps.currentTrack.playing != undefined) {
      if (this.state.id != nextProps.currentTrack.tracks[nextProps.currentTrack.trackIndex].id || this.state.playing != nextProps.currentTrack.playing) {
        for (var i = 0; i < nextProps.searchResults.length; i++) {
          if (nextProps.searchResults[i].id == nextProps.currentTrack.tracks[nextProps.currentTrack.trackIndex].id) {
            nextProps.searchResults[i].playing = nextProps.currentTrack.playing;
            this.setState({ id: nextProps.currentTrack.tracks[nextProps.currentTrack.trackIndex].id, trackIndex: nextProps.currentTrack.trackIndex, playing: nextProps.currentTrack.playing });
          } else
            nextProps.searchResults[i].playing = false
        }
      }
    }
  }

  render() {

    if (this.props.searchResults != undefined) {

      return (
        <ScrollView>
          {
            this.props.searchResults.map((track, index) => {

              return <Track
                key={index}
                onPlayPress={this.onPlayPress.bind(this, track, index, track.playing)}
                track={track}
                id={track.id}
                downloading={track.downloading}
                playing={track.playing}
                progreses={this.props.progreses}
                downloadTrack={this.onDownloadPress.bind(this, track)}
                search={track.search}
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
    searchResults: store.searchResults,
    currentTrack: store.currentTrack,
    tracks: store.tracks,
    progreses: store.progreses,
    syncAction: store.syncComplated,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
