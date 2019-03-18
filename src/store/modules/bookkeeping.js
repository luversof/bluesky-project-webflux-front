const state = {
    myBookkeeping: null
};
  
const mutations = {
    setMyBookkeeping(state, myBookkeeping) {
        state.myBookkeeping = myBookkeeping;
    }
};
  
export default {
    state,
    mutations
};
