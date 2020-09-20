import { Store, createStore as reduxCreateStore, applyMiddleware } from 'redux';
import {ApplicationReducer} from './reducers';
import {IApplicationState} from '../Interface';
import thunk from 'redux-thunk';

export function createStore(initialState?: IApplicationState): Store<IApplicationState> {
  return reduxCreateStore(ApplicationReducer,applyMiddleware(thunk));
}