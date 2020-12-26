const initialState = {
  score: 0,
  prevScore: 0,
  highest: [0],
};

export default (state = initialState, { type } = {}) => {
  switch (type) {
    case "PASS":
      return { ...state, score: state.score + 1 };
    case "GAME_OVER":
      const newArr = [...state.highest];
      newArr.push(state.score);
      return { ...state, prevScore: state.score, score: 0, highest: [...newArr] };
    default:
      return state;
  }
};
