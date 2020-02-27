function newDataReducer(dataState, action) {
  let newData;
  let x;
  if ((action.key in dataState.plot) == true) {
    newData = dataState.plot[action.key].slice(0);
    x = newData[newData.length - 1].x + 0.2;
  }
  else {
    newData = [];
    x = 0.0;
  }

  if (newData.length > 50) {
    newData.shift(1);
  }
  newData.push( {
    x: x,
    y: action.value
  });


  return ({
      plot: {
        ...dataState.plot,
        [action.key]: newData
      },
      current: {
        ...dataState.current,
        [action.key]: action.value
      }
  });
}

export { newDataReducer };