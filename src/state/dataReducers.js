function newDataReducer(dataState, action) {
  let newData;
  let x;
  let items = action.data;

  let newState = dataState;

  for (const key in items) {
    if (key in dataState.plot) {
      newData = dataState.plot[key].slice(0);
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
      y: items[key]
    });

    newState = {
      plot: {
        ...newState.plot,
        [key]: newData,
      },
      current: {
        ...newState.current,
        [key]: items[key],
      }
    }
  }

  return newState;
}


export { newDataReducer };