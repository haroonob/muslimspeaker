import * as types from './types';
import * as Utils from '../helpers/utils';
import { getDatabase } from '../firebase'

export function searchTrack(category,queryText) {
  return async (dispatch) => {
    
    let tracks = await Utils.getFromStorage(category.index + "/trackList");
    let downloadedTracks = await Utils.getFromStorage(category.index + "/tracks");
    let res=Utils.filterSearch(tracks,queryText);
    let searchTracks=[];
   
    res.map(obj=>{
        searchTracks.push(getDownlodedTrack(downloadedTracks,obj))
    });
           dispatch(setCurrentCategory(category)); 
      
    return dispatch(setSearchResults(searchTracks));
 }
}

export function setSearchResults(tracks) {
  return {
    type: types.SEARCH,
    payload:tracks
  }
}

export function setCurrentCategory(category) {
  return {
    type: types.CATEGORY,
    payload:category
  }
}

 export function getDownlodedTrack(downloadedTracks,track){
  let tracks=downloadedTracks.filter(obj=>{return obj.id==track.id});
  if(tracks.length>0)
     return {...tracks[0],search:false};
  else
    return {...track,search:true};
  }