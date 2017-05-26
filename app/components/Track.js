import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';

// import RNSimpleShare from 'react-native-simple-share';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
 import Share, {ShareSheet, Button} from 'react-native-share';
import Styles from '../styles';

import * as Progress from 'react-native-progress';
import { Actions } from 'react-native-router-flux';
let {height, width} = Dimensions.get('window');

export default class Track extends Component {
  state = { trackImage: "../img/music.jpg" }

share(track) {
  let shareOptions = {
      title: 'Power of Voice',
      message: "Power of Voice \n\n"+track.title+"\n\n",
      url: track.path,
      subject: "Audio Track", //  for email
      type:'audio/mpeg',
      imageUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    };
//   RNSimpleShare.share({
//   title: track.title,
//   description: track.title,
//   url: track.path,
//   imageUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
  
  
//   subject: track.title, 

//   anchor: React.findNodeHandle(this.refs.share), // iPad only
// });
   Share.open(shareOptions);
  
}
  renderProgressBar() {
   
    if (!this.props.progreses) return null;
    var progress = this.props.progreses[this.props.id];
     if (this.props.search && (progress && progress > 0 && progress < 0.95)) {
      return <Progress.Bar progress={progress} width={width - 20} color="#143520" borderColor="transparent" />
    } else return null
  }
  renderPlayButton() {

    if (this.props.search) {
   
      var progress = this.props.progreses[this.props.id];
      if (progress && progress > 0 && progress < 0.95) {
        return <TouchableOpacity style={Styles.trackButton}>
          <FontAwesome name="times" size={20} color={'grey'} />
        </TouchableOpacity>

      } else {
        return <TouchableOpacity style={Styles.trackButton} onPress={this.props.downloading ? (() => null) : this.props.downloadTrack}>
          <FontAwesome name="download" size={20} color={'#000'} />
        </TouchableOpacity>
      }
    } else {

      return <TouchableOpacity style={Styles.trackButton} onPress={this.props.onPlayPress}>
        <FontAwesome name={this.props.playing==true?"pause": "play"} size={20} color={'#000'} style={{ paddingRight: 20 }} />
      </TouchableOpacity>
    }

  }
  renderShareButton() {
    if (this.props.search) {
     
       return <TouchableOpacity style={Styles.trackButton} onPress={this.share.bind(this,this.props.track)}>
        <FontAwesome name={"share-alt"} size={15} color={'#000'} style={{ paddingRight: 20 }} />
      </TouchableOpacity>
    } else {
    
      return null;
    }

  }
  render() {

    if (this.props.track != undefined) {
     
      return (
        <View style={Styles.trackContainer}>

          <View style={Styles.trackView}>
            <TouchableOpacity style={Styles.trackDetail} >
              <Image source={{ uri: this.props.search ? this.props.track.thumb : 'file://' + this.props.track.thumb ||'file://' + this.state.trackImage }}
                style={Styles.trackTitleImage} />
              <View>
                <Text style={Styles.trackTitleText}>{this.props.track.title || "Unknown Track"}</Text>
                <View>
                  <Text style={Styles.trackDuration}>{this.props.track.duration || "00:00"}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={Styles.trackAction}>
              {this.renderPlayButton()}
              {this.renderShareButton()}
            </View>
          </View>

          {this.renderProgressBar()}
     
        </View>
      );
    }
    return null;
  }

}
