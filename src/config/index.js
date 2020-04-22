import {_extends,_colorMap} from './extends'
export const COLOR_MAP=_colorMap
export const KLINE_MAP={
    'Hour':'hour',
    'Five':'five',
    'Day':'day'
}
export const KLINE_NAME={
    [KLINE_MAP.Hour]:'分时',
    [KLINE_MAP.Five]:'五日',
    [KLINE_MAP.Day]:'日K'
}
export const INDEXS=['sh000001','sz399001','sz399006']
export const RANKS=['bkqtRank_A_sh','bkqtRank_B_sh','bkqtRank_A_sz','bkqtRank_B_sz']
// 适配器
export const ADAPERS={
    'tencent':'tencent' // 腾讯
}
// 默认适配器
export const DEFAULT_ADAPER=ADAPERS.tencent
// 图表
export const CHARTS={
    'f2':'f2'
}
// 默认图表
export const DEFAULT_CHART=CHARTS.f2
export const TIME_TICKS=['09:30','10:30','11:30','14:00','15:00']

// 股票字段map
export const MAPS=[
    {title:'昨收',field:'yesterday',static:1},
    {title:'今开',field:'today',static:1},
    {title:'最高',field:'max'},
    {title:'最低',field:'min'},
    {title:'振幅',field:'amplitude'},
    {title:'成交量',field:'volumn'},
    {title:'成交额',field:'volumnValue'},
    {title:'总市值',field:'total',index:0},
    {title:'流通市值',field:'market',index:0},
    {title:'换手率',field:'turnrate',index:0},
    {title:'市净率',field:'marketrate',index:0},
    {title:'市盈率',field:'perate',index:0},
]
// 扩展信息
export const EXTENDS=_extends