import { action } from "easy-peasy";

export default {
    currentBalance: 0,
    setCurrentBalance: action((state, payload) => {
        state.currentBalance= payload;
    })
}