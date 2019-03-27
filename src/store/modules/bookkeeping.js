const state = {
    myBookkeeping: {},
    assetTypes: []
};

const mutations = {
    setMyBookkeeping(state, myBookkeeping) {
        state.myBookkeeping = myBookkeeping;
    },
    setAssetTypes(state, assetTypes) {
        state.assetTypes = assetTypes
    }
};

export default {
    state,
    mutations
};
