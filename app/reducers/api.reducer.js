import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';


export const tracks = createReducer([], {
    [types.DOWNLOADED](state, action) {
        if(state.indexOf(action.path) > -1) {
          return state;
        }

        return [...state, action.path];
    },
    [types.TRACKS](state, action) {
      return action.tracks;

    }
});

export const progreses = createReducer({}, {
  [types.PROGRESS](state, action) {
    state[action.id] = action.progress;
    return {...state};
  }
})

export const category = createReducer({}, {
  [types.CATEGORY](state, action) {
    state[action.id] = action.category;
    return {...state};
  }
})
export const currentTrack = createReducer({}, {
  [types.TOGGLE_PLAY](state, action) {
 //   console.log('currentTrack',action);
    return action.payload;
  }
})
export const updatedTrack = createReducer({}, {
  [types.TOGGLE_INDEX](state, action) {
 
    return action.payload;
  }
})

export const searchResults = createReducer([], {
  [types.SEARCH](state, action) {
    return action.payload;
  }
})

export const profileResult = createReducer([], {
  [types.PROFILE](state, action) {
   // console.log('profileResult',action.payload)
    return action.payload;
  }
})

export const syncComplated = createReducer([], {
  [types.SYNC_COMPLETED](state, action) {
   // console.log('profileResult',action.payload)
    return action;
  }
})

// export default function reducer(state = initialState, action) {
//   let list

//   console.log(action)
//   switch (action.type) {
//   case ADD_ITEM_SUCCESS:
//     list = state.onlineList.concat([action.itemData]).sort((a, b) => b.time - a.time)

//     return {
//       ...state,
//       onlineList: list,
//       offlineList: list
//     }
//   case REMOVE_ITEM_SUCCESS:
//     list = state.onlineList.slice(0)
//     const index = list.map(i => i.id).indexOf(action.id)
//     list.splice(index, 1)

//     return {
//       ...state,
//       onlineList: list,
//       offlineList: list
//     }
//   case OFFLINE_ITEMS_LOADED:
//     return {
//       ...state,
//       offlineList: action.items,
//       offlineLoaded: true
//     }
//   case CONNECTION_CHECKING:
//     return {
//       ...state,
//       connectionChecked: false
//     }
//   case CONNECTION_CHECKED:
//     return {
//       ...state,
//       connectionChecked: true
//     }
//   case CONNECTION_ONLINE:
//     return {
//       ...state,
//       connectionChecked: true,
//       connected: true
//     }
//   case CONNECTION_OFFLINE:
//     return {
//       ...state,
//       connectionChecked: true,
//       connected: false
//     }
//   default:
//     return state
//   }
// }