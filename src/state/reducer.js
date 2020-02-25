import { combineReducers } from "redux"
import { newDataReducer } from "../state/dataReducers"


export const NEW_DATA = 'NEW_DATA';
export const CONNECTED = 'connected';


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

const reducer = combineReducers({
  data: dataReducer
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
