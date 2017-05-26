import * as types from './types';
// import Config from '../config';
import RNFetchBlob from 'react-native-fetch-blob';
import * as Utils from '../helpers/utils';
import { AsyncStorage,Alert,Platform } from 'react-native';
import RNFS from 'react-native-fs';

export function downloadAudio(category, track) {
  return async (dispatch) => {
    //track.downloading = false;
    let tracks = await Utils.getFromStorage(category.index + "/tracks");
    if (Utils.findTrackInCollection(track.id, tracks)) return {};
    let progressStatus = '0 % completed';
     var now             = new Date().getTime();

    let dirs = RNFetchBlob.fs.dirs;
    dispatch(setProgress(0.001, track.id));
    
 
    const trackRes = await RNFetchBlob
      .config({
        path: `${dirs.DocumentDir}/${track.id}.mp3`
      })
      .fetch('GET', track.path, {
      })
      .progress((received, total) => {
       progressStatus =parseInt(''+(received / total*100))+' % completed';
     
        dispatch(setProgress(received / total, track.id));
      })
  
    const headers = trackRes.respInfo.headers;
    if (!Utils.isAudioObject(headers['Content-Type'])) return;
    if(track.thumb){
      const imgRes = await RNFetchBlob
        .config({
          path: `${dirs.DocumentDir}/${track.id}.jpg`
        })
        .fetch('GET', track.thumb, {
        });
        track.thumb = imgRes.path();
    }

    track.path = trackRes.path();
   
    track.downloaded = true;
    tracks = JSON.stringify([...tracks, track]);
    await AsyncStorage.setItem(category.index + "/tracks", tracks);
    return dispatch(setTracks(JSON.parse(tracks)));
  }
}

// export function musicDownloaded(path) {
//   return {
//     type: types.DOWNLOADED,
//     path
//   }
// }

export function getTracks(category) {
  return async (dispatch) => {
    let tracks = await Utils.getFromStorage(category.index + "/tracks");
    console.log('donwloaded tracks',tracks)
    return dispatch(setTracks(tracks));
  }
}

export function toggleTrack(tracks,trackIndex, playing) {
  return async (dispatch) => {

    return dispatch(dispatchPlay(tracks,trackIndex,playing));
  }
}

export function dispatchPlay(tracks,trackIndex,playing) {
      return {
        type: types.TOGGLE_PLAY,
        payload:{tracks:tracks,trackIndex:trackIndex,playing:playing}
      }
}

export function downloadIOS(track){
    const progress = data => {
      const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
      const text = `Progress ${percentage}%`;
     // console.log(text);
    };

    const begin = res => {
    //  console.log('Download has begun');
//this.setState({ output: 'Download has begun' });
    };

    const progressDivider = 1;

    

    // Random file name needed to force refresh...
    const downloadDest = `${RNFS.ExternalStorageDirectoryPath}/${((Math.random() * 1000) | 0)}.mp3`;
    let background=true;
    const ret = RNFS.downloadFile({ fromUrl: track.path, toFile: downloadDest, begin, progress, background, progressDivider });

  

    ret.promise.then(res => {
      this.setState({ output: JSON.stringify(res) });
      this.setState({ imagePath: { uri: 'file://' + downloadDest } });
    //  console.log(imagePath, 'file://' + downloadDest);
     // console.log(imagePath, JSON.stringify(res) );
      jobId = -1;
    }).catch(err => {
        console.log(err);
      this.showError(err)

      jobId = -1;
    });
}
export function deleteTrack(index, track) {
  return async (dispatch) => {
    let tracks = await Utils.getFromStorage(index + "/tracks");
    try {
      await RNFS.unlink(track.path);
      await RNFS.unlink(track.thumb);
      tracks.splice(index, 1);
      await AsyncStorage.setItem(index + '/tracks', JSON.stringify(tracks));
      return dispatch(setTracks(tracks));
    } catch (err) {
      //If track not fount in path
      tracks.splice(index, 1);
      await AsyncStorage.setItem(index + '/tracks', JSON.stringify(tracks));
      return dispatch(setTracks(tracks));
    }
  }
}



export function setTracks(tracks) {
  return {
    type: types.TRACKS,
    tracks
  }
}

export function setProgress(progress, id) {
  return {
    type: types.PROGRESS,
    progress,
    id
  }
}
