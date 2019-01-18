import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './userReducer';
import userInfo from './userInfo';

export default history =>
  combineReducers({
    router: connectRouter(history),
    userReducer,
    userInfo,
  });
