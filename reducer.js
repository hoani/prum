export const NEW_DATA = 'new_data';

export default function reducer(state = { plot_data: {} }, action) {
  switch (action.type) {
    case NEW_DATA:
      let new_data;
      if ((action.key in state.plot_data) == true) {
        new_data = state.plot_data[action.key].slice(0);
      }
      else {
        new_data = [];
      }

      if (new_data.length > 100) {
        new_data.shift(1);
      }
      new_data.push(action.value);
      return Object.assign({}, state, {
        plot_data: {
          ...state.plot_data,
          [action.key]: new_data
        }
      });

    default:
      return state;
  }
}

export function newData(value, key) {
  return {
    type: NEW_DATA,
    key: key,
    value: value
  };
}
