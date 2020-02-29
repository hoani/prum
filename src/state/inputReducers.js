function inputEventReducer(inputState, action) {
  console.log(action)
  return ({
      ...inputState,
      [action.key]: action.data
  });
}

export { inputEventReducer };