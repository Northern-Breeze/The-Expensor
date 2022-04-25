import {Action, action} from 'easy-peasy';

interface Model {
  currentBalance: number;
  balanceArray: number[];
  setBalanceArray: Action<Model, number>,
  setCurrentBalance: Action<Model, number>
}

const model: Model = {
  currentBalance: 0,
  balanceArray: [],
  setBalanceArray: action((state, payload) => {
    state.balanceArray.push(payload);
    if (state.balanceArray.length > 0) {
      state.currentBalance = state.balanceArray[0];
    }
  }),
  setCurrentBalance: action((state, payload) => {
    state.currentBalance = payload;
  }),
};

export default model;