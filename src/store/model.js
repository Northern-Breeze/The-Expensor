import {action} from 'easy-peasy';

export default {
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
