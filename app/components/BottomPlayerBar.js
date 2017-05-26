import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  Dimensions,
  Platform,
  ActivityIndicator, StyleSheet
} from 'react-native';

import Video from 'react-native-video';
import Styles from '../styles';
import * as Utils from '../helpers/utils';
import { ForwardButton, BackwardButton, PlayButton, ShuffleButton, VolumeButton, DownloadButton, TrackSlider } from '../components/PlayerButtons';
import MusicControl from 'react-native-music-control';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';
let {height, width} = Dimensions.get('window');

class BottomPlayerBar extends Component {
  audioTrack;
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      muted: false,
      shuffle: false,
      sliding: false,
      currentTime: 0,
      loaded: false,
      trackIndex: props.trackIndex,
      tracks: props.tracks,
    };

  }

  setPlayingTrack() {
    this.audioTrack = this.state.tracks[this.state.trackIndex];
    MusicControl.setNowPlaying({
      title: this.audioTrack.title,
      artwork: this.audioTrack.thumb,
      duration: this.state.trackDuration
    });


  }
  onPlay() {
    this.props.toggleTrack(this.state.tracks, this.state.trackIndex, !this.state.playing);
  }

  togglePlay() {
      //  console.log('togglePlay',this.state.playing)
    if (!this.state.playing) {
      MusicControl.setPlayback({
        state: MusicControl.STATE_PLAYING,
        //elapsedTime: 103,
      })
      MusicControl.enableControl("pause", true)
    } else {
      MusicControl.setPlayback({
        state: MusicControl.STATE_PAUSED,
      })
      MusicControl.enableControl("play", true);
    }
    this.setState({ playing: !this.state.playing });
  }

  toggleVolume() {
    this.setState({ muted: !this.state.muted });
  }

  toggleShuffle() {
    this.setState({ shuffle: !this.state.shuffle });
  }

  goBackward() {
    if (this.state.currentTime < 3 && this.state.trackIndex !== 0) {
         this.props.toggleTrack(this.state.tracks, this.state.shuffle ? this.randomTrackIndex() : this.state.trackIndex - 1, this.state.playing);
    } else {
      if(this.player)
      this.player.seek(0);
      this.setState({
        currentTime: 0,
      });
    }
  }

  goForward() {
    if (this.state.shuffle || this.state.trackIndex + 1 != this.state.tracks.length) {
      this.props.toggleTrack(this.state.tracks, this.state.shuffle ? this.randomTrackIndex() : this.state.trackIndex + 1, this.state.playing);
    }
  }

  randomTrackIndex() {
    let maxIndex = this.state.tracks.length - 1;
    return Math.floor(Math.random() * (maxIndex - 0 + 1)) + 0;
  }

  setTime(params) {
      console.log('setTime',params);
      this.state.loaded = true;
      this.setState({ currentTime: params.currentTime });
      //this.props.currentTrack.tracks[this.props.currentTrack.trackIndex].currentTime = params.currentTime
    
    
  }

  onLoad(params) {
    console.log('onLoad',this.state.currentTime);
    this.setState({currentTime:this.state.currentTime, trackDuration: params.duration });
    this.player.seek(this.state.currentTime);
    this.setPlayingTrack();
    /////////////////////////////////////
    // workaround to show control first time. it is not working properly  
    MusicControl.setPlayback({
      state: MusicControl.STATE_PLAYING,
      elapsedTime: 103
    });

    MusicControl.enableControl('pause', true);
    MusicControl.setPlayback({
      state: MusicControl.STATE_PAUSED,
      elapsedTime: 103
    });

    MusicControl.enableControl('play', true);

    ///////////////////////////////////////////////////////////
    MusicControl.setPlayback({
      state: MusicControl.STATE_PLAYING,
      elapsedTime: 103
    });

    MusicControl.enableControl('pause', true);

    //  this.player.seek(this.state.currentTime);

  }


  componentWillReceiveProps(nextProps) {
    let currentTrack;
   if(this.state.tracks){
    this.props.downloadedTracks.map(obj=>{
      if(this.state.tracks[this.state.trackIndex].id==obj.id)
       obj.currentTime=this.state.currentTime
    })
   }
    if (nextProps.currentTrack.trackIndex != undefined)
      currentTrack = nextProps.currentTrack;

    
    if ((currentTrack != null && currentTrack.trackIndex != undefined) &&  (currentTrack != null && nextProps.currentTrack.tracks[currentTrack.trackIndex].id != this.state.id)) {
       this.setState({ tracks: nextProps.currentTrack.tracks, trackIndex: currentTrack.trackIndex });
      console.log(nextProps.currentTrack.tracks[currentTrack.trackIndex].id,nextProps.currentTrack.tracks[currentTrack.trackIndex].currentTime) 
     if(nextProps.currentTrack.tracks[currentTrack.trackIndex].currentTime)
        this.setState({currentTime:nextProps.currentTrack.tracks[currentTrack.trackIndex].currentTime})
      else  
       this.setState({currentTime:0})
     if(currentTrack.playing != this.state.playing)
        this.togglePlay() ;

       // console.log('player ',this.player)  
    }
  }

  onSlidingStart() {
    this.setState({ sliding: true });
  }

  onSlidingChange(value) {
    let newPosition = value * this.state.trackDuration;
    this.setState({ currentTime: newPosition });
  }


  onSlidingComplete() {
    this.player.seek(this.state.currentTime);
    this.setState({ sliding: false });
  }

  onEnd() {
     if (this.state.shuffle || this.state.trackIndex + 1 != this.state.tracks.length) {
        this.props.toggleTrack(this.state.tracks, this.state.shuffle ? this.randomTrackIndex() : this.state.trackIndex + 1, this.state.playing);
     }else
        this.props.toggleTrack(this.state.tracks,  0, this.state.playing);

  }


  renderVideoPlayer() {
    if (this.state.tracks[this.state.trackIndex] && this.state.playing) {
      return (<Video
        source={{ uri: this.state.tracks[this.state.trackIndex].path }}
        volume={this.state.muted ? 0 : 1.0}
        muted={false}
        // ref="audio"
        ref={(ref) => {
          this.player = ref
        }}
        rate={1.0}

        playWhenInactive={true}                // [iOS] Video continues to play when control or notification center are shown.
        ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
        progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
      
        paused={!this.state.playing}
        playInBackground={true}
        onLoad={this.onLoad.bind(this)}
        onProgress={this.setTime.bind(this)}
        onEnd={this.onEnd.bind(this)}
        resizeMode="cover"
        repeat={true} />);
    }
    return null;
  }

  componentDidMount() {


    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', true);
    MusicControl.enableControl('seekForward', false);
    MusicControl.enableControl('seekBackward', false);
    MusicControl.enableBackgroundMode(true);

    MusicControl.on('play', () => {
      //  console.log('play')
      this.props.toggleTrack(this.state.tracks, this.state.trackIndex, !this.state.playing);

    });
    MusicControl.on('pause', () => {
      this.props.toggleTrack(this.state.tracks, this.state.trackIndex, !this.state.playing);
    });
    MusicControl.on('nextTrack', this.goForward.bind(this));
    MusicControl.on('previousTrack', this.goBackward.bind(this));

  }

  // renderProgressBar() {
  //   if (this.props.searchedTracks) {
  //     let track = this.state.tracks[this.state.trackIndex];
  //     return <Progress.Bar progress={this.props.progreses[track.id]} width={width} color="#000" borderColor="transparent" />
  //   }
  //   return null
  // }
  render() {
    let trackPercentage;
    if (this.state.trackDuration !== undefined) {
      trackPercentage = this.state.currentTime / this.state.trackDuration;
    } else {
      trackPercentage = 0;
    }

    if (this.state.tracks != null && this.state.tracks.length > 0) {
        return (
        <View style={Styles.footer} >

          {this.renderVideoPlayer()}
          <View style={{ flexDirection: 'column' }} >
            <TrackSlider
              onSlidingStart={this.onSlidingStart.bind(this)}
              onSlidingComplete={this.onSlidingComplete.bind(this)}
              onValueChange={this.onSlidingChange.bind(this)}
              value={trackPercentage}
              trackDuration={this.state.trackDuration}
              currentTime={this.state.currentTime}
              title={this.state.tracks[this.state.trackIndex].title}
            />
          </View>
          <View style={Styles.controls}>
            <ShuffleButton
              shuffle={this.state.shuffle}
              toggleShuffle={this.toggleShuffle.bind(this)}
              disabled={this.props.search}
            />
            <BackwardButton
              goBackward={this.goBackward.bind(this)}
            />
            <PlayButton
              togglePlay={this.onPlay.bind(this)}
              playing={this.state.playing}
            />
            <ForwardButton
              tracks={this.state.tracks}
              shuffle={this.state.shuffle}
              trackIndex={this.state.trackIndex}
              goForward={this.goForward.bind(this)}
              disabled={this.props.search}
            />
            <VolumeButton
              muted={this.state.muted}
              toggleVolume={this.toggleVolume.bind(this)}
            />
          </View>
        </View>
      );
    } return null;
  }
  componentWillUnmount() {

    MusicControl.resetNowPlaying();
    // this.player
  }
}




function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(store) {
  return {

    progreses: store.progreses,
    currentTrack: store.currentTrack,
    downloadedTracks: store.tracks,
  }
}

const inidicatorStyles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    position: 'absolute',
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(BottomPlayerBar);

