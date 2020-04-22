// 缓存
import storage from 'good-storage'
const __FREE_KEY__="__frees__"
export function setFree(list){
    storage.set(__FREE_KEY__,list)
}
export function getFrees(){
    return storage.get(__FREE_KEY__,[])
}

const __HISTORY_KEY="__history__"
export function setHistory(list){
    storage.set(__HISTORY_KEY,list)
}
export function getHistory(){
    return storage.get(__HISTORY_KEY,[])
}