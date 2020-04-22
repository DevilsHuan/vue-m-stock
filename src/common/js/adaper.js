// 行情数据适配器
import {adapers} from './adapers/'
import {charts} from './charts/'
import {KLINE_MAP,DEFAULT_ADAPER,DEFAULT_CHART} from '@/config/'

/**
 * 图表
 * @param {*} stock 股票对象
 * @param {*} kineType 图表类型，参考config/index.js KLINE_MAP字典
 */
export function klines(stock,kineType=KLINE_MAP.Hour){
    let _adaper=adapers[DEFAULT_ADAPER]
    let _chartAdaper=charts[DEFAULT_CHART]
    return new Promise((resolve,reject)=>{
        _adaper.klines[kineType](stock).then((_datas)=>{
            resolve(_chartAdaper.klines[kineType](stock,_datas,kineType))
        })
    }) 
}

/**
 * 大盘涨跌概况
 */
export function ranks(){
    let _adaper=adapers[DEFAULT_ADAPER]
    return _adaper.ranks()
}

/**
 * 指定股票详情行情
 * @param {*} code 股票代码，如sz002926
 */
export function hq(code){
    return adapers[DEFAULT_ADAPER].hq(code)
}

/**
 * 批量简要行情
 * @param {*} codes 批量行情
 */
export function shorts(codes){
    return adapers[DEFAULT_ADAPER].shorts(codes)
}

/**
 * 股票新闻/公告查询
 * @param {*} stock 股票对象
 * @param {*} noticeType 类型
 */
export function notices(stock,noticeType){
    return adapers[DEFAULT_ADAPER].notices(stock,noticeType)
}

/**
 * 排名榜
 */
export function tops(params){
    return adapers[DEFAULT_ADAPER].tops(params)
}

/**
 * 创建图表
 */
export function createKline(klineType,options={
    el:null,
    min:null,
    max:null,
    basic:null
}){
    let _chartAdaper=charts[DEFAULT_CHART]
    return _chartAdaper.creates[klineType](options)
}