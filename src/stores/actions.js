// 自选
import * as types from './mutation-types'
import * as adaper from '@/common/js/adaper'
import {INDEXS,SEARCHS,KLINE_MAP} from '@/config/'
import {stocks} from '@/common/js/stocks'

export function indexHq({commit,getters}){
    adaper.shorts(INDEXS).then(list=>{
        commit(types.INDEXS,list)
    })
}

// 图表
export function klines({commit},{stock,klineType=KLINE_MAP.Hour}){
    return adaper.klines(stock,klineType)
}

// 大盘涨跌情况
export function ranks({commit,getters}){
    return adaper.ranks()
}

// 股票基本信息
export function hq({commit,getters},code){
    return new Promise((resolve,reject)=>
        adaper.hq(code).then(datas=>{
            datas.free=getters.isFree(datas.code)
            resolve(datas)
        })
    )
}

// 自选股
export function shortByFrees({commit,getters}){
    this.dispatch('shortByCodes',getters.freeCodes()).then(list=>{
        commit(types.MINES,list)
    })
}

// 批量股票简要信息
export function shortByCodes({commit,getters},codes){
    return new Promise((resolve,reject)=>
        adaper.shorts(codes).then(datas=>{
            resolve(datas)
        })
    )
}

// 新闻公告
export function notices({commit},{stock,noticeType}){
    return adaper.notices(stock,noticeType)
}

// 排行榜
export function tops({commit},params){
    return adaper.tops(params)
}

export function addFree({commit,getters},stock){
    stock.free=true
    let _frees=getters.frees || []
    _frees.push({
        name:stock.name,
        code:stock.code
    })
    commit(types.FREE,_frees)
}

export function removeFree({commit,getters},stock){
    stock.free=false
    let _frees=getters.frees
    let _index=_frees.findIndex(_free=>_free.code==stock.code)
    if(_index>-1){
        _frees.splice(_index,1)
    }
    commit(types.FREE,_frees)
}

export function addHistory({commit,getters},stock){
    let _history=getters.history() || []
    let _index=_history.find(c=>c.code==stock.code)
    if(!_index || _index==-1){
        _history.push(stock)
        commit(types.HISTORY,_history)
    }
}

// 股票搜索
export function search({commit,getters},keyword){
    return new Promise((resolve,reject)=>{
        let _search=stocks.filter(s=>s.code.indexOf(keyword)==0)
        _search.forEach(_s=>{
            _s.prefix=_s.code.substring(0,1)=='6'?'SH':'SZ'
        })
        if(_search.length>50){
            _search=_search.splice(0,50)
        }
        resolve(_search)
    })
}