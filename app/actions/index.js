import * as trackActions from './track.actions';
import * as searchActions from './search.actions';
import * as profileActions from './profile.actions';
export default {...profileActions, ...trackActions, ...searchActions};
