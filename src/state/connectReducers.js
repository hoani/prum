function isConnectedReducer(connectState, action) {
  return ({
    isConnected: action.isConnected,
  });
}

export { isConnectedReducer };
