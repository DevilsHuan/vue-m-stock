import * as cache from '@/common/js/cache'
export const getters={
    indexs:state=>state.indexs,
    mines:state=>state.mines,
    isIndex:(state,getters)=>(code)=>{
        let _indexs=getters.indexs
        return _indexs.find(_index=>_index.code.substring(2,8)==code)
    },
    frees:(state)=>{
        return state.frees || cache.getFrees()
    },
    isFree:(state,getters)=>(code)=>{
        let _frees=getters.frees
        if(!_frees || _frees.length<1){
            return false
        }
        return _frees.find(_free=>_free.code==code)
    },
    freeCodes:(state,getters)=>()=>{
        let _frees=getters.frees
        let _list=[]
        _frees.forEach(_free=>{
            let _prefix=_free.code.substring(0,1)=='6'?'sh':'sz'
            _list.push(`${_prefix}${_free.code}`)
        })
        return _list
    },
    history:state=>()=>{
        return state.history || cache.getHistory()
    }
}