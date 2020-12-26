const initialState = {
  y: 250,
  r:0
};

export default (state = initialState, { type } = {}) => {
  switch (type) {
    case "FALL":
      return { ...state, y: state.y + 30,r: 0 };
    case "FLY":
      return { ...state, y: state.y - 50,r:-20 };
    case "GAME_OVER":
      return initialState
    default:
      return state;
  }
};
