import { combineReducers } from "redux"

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

function newDataReducer(dataState, action) {
  let new_data;
  let x;
  if ((action.key in dataState.plot) == true) {
    new_data = dataState.plot[action.key].slice(0);
    x = new_data[new_data.length - 1].x + 0.2;
  }
  else {
    new_data = [];
    x = 0.0;
  }

  if (new_data.length > 50) {
    new_data.shift(1);
  }
  new_data.push( {
    x: x,
    y: action.value
  });


  return ({
      plot: {
        ...dataState.plot,
        [action.key]: new_data
      },
      current: {
        ...dataState.current,
        [action.key]: action.value
      }
  });
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
