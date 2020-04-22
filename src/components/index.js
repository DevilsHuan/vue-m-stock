import _index from './index/index.vue'
import _search from './search/search.vue'
import _hqBase from './hq/hq-base.vue'
import _hqExtend from './hq/hq-extend.vue'
import _hqChart from './hq/hq-chart.vue'
import _loadingList from './loading-list/loading-list.vue'

export const index=_index
export const hqBase=_hqBase
export const hqExtend=_hqExtend
export const hqChart=_hqChart
export const search=_search
export const loadingList=_loadingList

// 组件导入
export function $components(components){
    let _components={}
    if(components instanceof Array){
        components.forEach(component=>{
            _components[component.name]=component
        })
    }else{
        _components[component.name]=component
    }
    return _components
}