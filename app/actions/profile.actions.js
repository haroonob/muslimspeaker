import * as types from './types';
import { Alert } from 'react-native';
// import  firebase,{firebaseRef} from '../firebase';
import { getDatabase } from '../firebase'
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
import * as Utils from '../helpers/utils';
import * as Constant from '../constant';
import { AsyncStorage } from 'react-native';
import * as firebase from 'firebase';

export function fetchData() {

  return async (dispatch, getState) => {
    let connected = false;
    getDatabase().ref('appsInfo')
      .once('value', async (snapshot) => {

        connected = true;
        let dirs = RNFetchBlob.fs.dirs;
        const obj = snapshot.val()
        const imgRes = await RNFetchBlob
          .config({
            path: `${dirs.DownloadDir}/profile_picture.jpg`
          })
          .fetch('GET', obj.profile.profile_picture, {
          }).then((res) => {
            obj.profile.profile_picture = res.path();
          });
        Utils.setToStorage(Constant.BASE_PROFILE, obj)
        dispatch(showProfile(obj));
      });

    setTimeout(function () {
      if (!connected)
        dispatch(getProfile());
    }, 5000)
  };
}

export function getProfile() {
  return async (dispatch) => {
    let profile = await Utils.getFromStorage(Constant.BASE_PROFILE);
    return dispatch(showProfile(profile));
  }
}
export function showProfile(payload) {
  return {
    type: types.PROFILE,
    payload
  };
}

export function syncData() {

  return async (dispatch, getState) => {
    //  AsyncStorage.clear();
    getDatabase().ref('updateOn').set(firebase.database.ServerValue.TIMESTAMP);
    
      getDatabase().ref('updateOn').once('value', async (timestamp) => {

      let lastSyncTimeStamp = await Utils.getFromStorage(Constant.SYNC_TIME_STAMP);
      if (lastSyncTimeStamp.length != undefined || lastSyncTimeStamp.length == 0)
        lastSyncTimeStamp = 0;

      getDatabase().ref('appsInfo').once('value', async (snapshot) => {
        let dirs = RNFetchBlob.fs.dirs;
        const obj = snapshot.val()
        const imgRes = await RNFetchBlob
          .config({
            path: `${dirs.DownloadDir}/profile_picture.jpg`
          })
          .fetch('GET', obj.profile.profile_picture, {
          }).then((res) => {
            obj.profile.profile_picture = res.path();
          });
        Utils.setToStorage(Constant.BASE_PROFILE, obj);

        for (let entry of obj.categories) {
          loadCategoryTracks(entry.index, lastSyncTimeStamp);
        }

        Utils.setToStorage(Constant.SYNC_TIME_STAMP, timestamp.val());
        dispatch(syncComplete());
      });
    });
  };
}

export async function loadCategoryTracks(category_index, lastSyncTimeStamp) {
  let trackList = await Utils.getFromStorage(category_index + "/trackList");
  getDatabase().ref('tracks/' + category_index).orderByChild("timestamp").startAt(lastSyncTimeStamp).once('value', async (snapshot) => {
    let res = snapshot.val();
    if (res != null) {
      trackList = trackList.concat(res);
      Utils.setToStorage(category_index + "/trackList", trackList);
      trackList = await Utils.getFromStorage(category_index + "/trackList");
  }
 });
}

export function syncComplete() {
  return {
    type: types.SYNC_COMPLETED
  };
}