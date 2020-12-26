const initialState = {
  x: 400,
  pipes: [],
};

export default (state = initialState, { type } = {}) => {
  switch (type) {
    case "RUNNING":
      return { ...state, x: state.x - 10 };
    case "GENERATING":
      const topHeight = Math.round(Math.random() * 200) + 50;
      return { ...state, pipes: [...state.pipes, { topHeight: topHeight }] };
    case "GAME_OVER":
      return initialState;
    default:
      return state;
  }
};
