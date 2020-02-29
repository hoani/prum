import { combineReducers } from "redux"
import { newDataReducer } from "../state/dataReducers"
import { isConnectedReducer } from "../state/connectReducers"
import { inputEventReducer } from "./inputReducers";


export const NEW_DATA = 'NEW_DATA';
export const CONNECTED = 'CONNECTED';
export const INPUT = 'INPUT';


function createReducer(initialState, handlers) {
  return function retReducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

const dataReducer = createReducer({ plot: {}, current: {} }, {
  NEW_DATA: newDataReducer,
});

const connectReducer = createReducer({ isConnected: false }, {
  CONNECTED: isConnectedReducer,
});

const inputReducer = createReducer({}, {
  INPUT: inputEventReducer,
});

const reducer = combineReducers({
  data: dataReducer,
  connect: connectReducer,
  input: inputReducer
});

export default reducer;

export function newData(value, key) {
  console.log('.data')
  return {
    type: NEW_DATA,
    key: key,
    value: value
  };
}

export function connected(isConnected) {
  console.log('.connected')
  return {
    type: CONNECTED,
    isConnected: isConnected,
  };
}

export function input(key, data) {
  console.log('.input')
  return {
    type: INPUT,
    key: key,
    data: data
  };
}
