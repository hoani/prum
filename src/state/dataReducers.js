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

export { newDataReducer };