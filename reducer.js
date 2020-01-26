export const NEW_DATA = 'new_data';

export default function reducer(state = { plot_data: {}, current_data: {} }, action) {
  switch (action.type) {
    case NEW_DATA:
      let new_data;
      let x;
      if ((action.key in state.plot_data) == true) {
        new_data = state.plot_data[action.key].slice(0);
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


      return Object.assign({}, state, {
        plot_data: {
          ...state.plot_data,
          [action.key]: new_data
        },
        current_data: {
          ...state.current_data,
          [action.key]: action.value
        }
      });

    default:
      return state;
  }
}

export function newData(value, key) {
  console.log('.data')
  return {
    type: NEW_DATA,
    key: key,
    value: value
  };
}
