// 自选
import * as cache from '@/common/js/cache'
import * as types from './mutation-types'
const mutations={
    [types.INDEXS](state,value){
        state.indexs=value
    },
    [types.MINES](state,value){
        state.mines=value
    },
    [types.FREE](state,value){
        state.frees=value
        cache.setFree(value)
    },
    [types.HISTORY](state,value){
        state.history=value
        cache.setHistory(value)
    }
}
export default mutations