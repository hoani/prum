function inputEventReducer(inputState, action) {
  return ({
      ...inputState,
      [action.key]: action.data
  });
}

export { inputEventReducer };