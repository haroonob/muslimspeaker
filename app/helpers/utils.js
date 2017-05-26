import {AsyncStorage} from 'react-native';
// import Config from '../config';
import RNFS from 'react-native-fs';


function withLeadingZero(amount){
  if (amount < 10 ){
    return `0${ amount }`;
  } else {
    return `${ amount }`;
  }
}

export function formattedTime( timeInSeconds ){
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds - minutes * 60;

  if( isNaN(minutes) || isNaN(seconds) || minutes < 0 && seconds < 0){
    return "";
  } else {
    return(`${ withLeadingZero( minutes ) }:${ withLeadingZero( seconds.toFixed(0) ) }`);
  }
}

export function findTrackInCollection(id, tracks) {
  return tracks.filter(track => track.id == id).length;
}

export function isAudioObject(contentType) {
  return contentType == "audio/mpeg";
}

export function getTrackName(contentDescription) {
    return contentDescription.split("=")[1].replace(/"/g, "").split(".mp3")[0];
}

export function filterSearchResults(res) {
  return res.items.map(item => {
    return {
      id: item.id.videoId,
      artist: item.snippet.channelTitle,
      title: item.snippet.title,
      thumb: item.snippet.thumbnails.high.url,
      path: getTrackUrl(item.id.videoId)
    }
  });
}

export function filterSearch(tracks,title) {
  if(title.length==0)
  return tracks;
  return tracks.filter(track => track.title.indexOf(title))
}
// export function getTrackUrl(id) {
//   return `${Config.API_URL}${id}`;
// }

export async function getFromStorage(key) {
//  console.log('getFromStorage',key);
  let tracks = await AsyncStorage.getItem(key);
  tracks=tracks==null?JSON.stringify([]):tracks;
  return JSON.parse(tracks);
}


export async function setToStorage(key,newData) {
   data = JSON.stringify(newData);
   await AsyncStorage.setItem(key, data);
  return true; 
}
