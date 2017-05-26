import React, {Component} from 'react';
import {
  Image,
  Text,
  View
} from 'react-native';
import Button from 'react-native-button';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from '../styles';
import Slider from 'react-native-slider';
// import { Player } from 'react-native-audio-streaming';
import * as Utils from '../helpers/utils';

export class PlayButton extends Component {
  render() {
    return <FontAwesome onPress={ this.props.togglePlay } style={ Styles.play } name={this.props.playing?"pause": "play"} size={30} color="#000" />;
  }
}

export class ForwardButton extends Component {
  render() {
    let forwardButton = null;
    if(!this.props.shuffle && this.props.trackIndex + 1 === this.props.tracks.length ) {
      forwardButton = <FontAwesome style={ Styles.forward } name="forward" size={20} color="#333" />;
    } else {
      forwardButton = <FontAwesome onPress={ this.props.goForward} style={ Styles.forward } name="forward" size={20} color="#000" />;
    }

    return forwardButton;
  }
}

export class BackwardButton extends Component {
  render() {
   // console.log('BackwardButton');
    return <FontAwesome onPress={ this.props.goBackward } style={ Styles.back } name="backward" size={20} color="#000" />
  }
}

export class VolumeButton extends Component {
  render() {
      //  console.log('VolumeButton');
    return <FontAwesome onPress={ this.props.toggleVolume } style={ Styles.volume } name={this.props.muted?"volume-off": "volume-up"} size={18} color="#000" />;
  }
}

export class ShuffleButton extends Component {
  render() {
    // console.log('ShuffleButton');
    return  <FontAwesome onPress={ this.props.toggleShuffle } style={ Styles.shuffle } name="random" size={18} color={this.props.shuffle?"#f62976": "#000"} />;
  }
}

export class DownloadButton extends Component {
 
  render() {
   //console.log('DownloadButton');
    if(!this.props.download || this.props.downloading) {
      return  <FontAwesome style={ Styles.downloadButton } name="download" size={20} color="#333" />;
    }
    return  <FontAwesome onPress={ this.props.downloadAudio } style={ Styles.downloadButton } name="download" size={20} color="#fff" />;
  }
}

 
// export class PlayerUI extends Component {
//   render() {
//     return (
//         <Player url={this.props.url} />
//     );
//   }
// }

export class TrackSlider extends Component {
  render() {

    return (
          <View style={ Styles.sliderContainer }>
            <Slider
              onSlidingStart={ this.props.onSlidingStart }
              onSlidingComplete={ this.props.onSlidingComplete }
              onValueChange={ this.props.onValueChange }
              minimumTrackTintColor='#000'
              style={ Styles.slider }
              trackStyle={ Styles.sliderTrack }
              thumbStyle={ Styles.sliderThumb }
              value={ this.props.value }/>

            <View style={ Styles.timeInfo }>
              <Text style={ Styles.time }>{ Utils.formattedTime(this.props.currentTime)  }</Text>
              <Text style={ Styles.titleCenter }>{this.props.title}</Text>
              <Text style={ Styles.timeRight }>- { Utils.formattedTime( this.props.trackDuration - this.props.currentTime ) }</Text>
            </View>
        </View>
    )
  }
}
