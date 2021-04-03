const state = {
    addSpuSelectCategoryId:""
}
const mutations = {
    updateState(state: any, payload: any) {
        let keys:Array<any>=Object.keys(payload);
        keys.forEach((key)=>{
            state[key]=payload[key]
        })
    },
}
export default {
    namespaced: true,
    mutations,
    state
}
