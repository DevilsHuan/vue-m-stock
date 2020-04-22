// 腾讯行情数据适配器
import {format,formatDate,appendScript} from '../util'
import {KLINE_MAP,INDEXS,RANKS} from '@/config/'
const klines={}
let _hours=["09:30","09:31","09:32","09:33","09:34","09:35","09:36","09:37","09:38","09:39","09:40","09:41","09:42","09:43","09:44","09:45","09:46","09:47","09:48","09:49","09:50","09:51","09:52","09:53","09:54","09:55","09:56","09:57","09:58","09:59","10:00","10:01","10:02","10:03","10:04","10:05","10:06","10:07","10:08","10:09","10:10","10:11","10:12","10:13","10:14","10:15","10:16","10:17","10:18","10:19","10:20","10:21","10:22","10:23","10:24","10:25","10:26","10:27","10:28","10:29","10:30","10:31","10:32","10:33","10:34","10:35","10:36","10:37","10:38","10:39","10:40","10:41","10:42","10:43","10:44","10:45","10:46","10:47","10:48","10:49","10:50","10:51","10:52","10:53","10:54","10:55","10:56","10:57","10:58","10:59","11:00","11:01","11:02","11:03","11:04","11:05","11:06","11:07","11:08","11:09","11:10","11:11","11:12","11:13","11:14","11:15","11:16","11:17","11:18","11:19","11:20","11:21","11:22","11:23","11:24","11:25","11:26","11:27","11:28","11:29","11:30","13:00","13:01","13:02","13:03","13:04","13:05","13:06","13:07","13:08","13:09","13:10","13:11","13:12","13:13","13:14","13:15","13:16","13:17","13:18","13:19","13:20","13:21","13:22","13:23","13:24","13:25","13:26","13:27","13:28","13:29","13:30","13:31","13:32","13:33","13:34","13:35","13:36","13:37","13:38","13:39","13:40","13:41","13:42","13:43","13:44","13:45","13:46","13:47","13:48","13:49","13:50","13:51","13:52","13:53","13:54","13:55","13:56","13:57","13:58","13:59","14:00","14:01","14:02","14:03","14:04","14:05","14:06","14:07","14:08","14:09","14:10","14:11","14:12","14:13","14:14","14:15","14:16","14:17","14:18","14:19","14:20","14:21","14:22","14:23","14:24","14:25","14:26","14:27","14:28","14:29","14:30","14:31","14:32","14:33","14:34","14:35","14:36","14:37","14:38","14:39","14:40","14:41","14:42","14:43","14:44","14:45","14:46","14:47","14:48","14:49","14:50","14:51","14:52","14:53","14:54","14:55","14:56","14:57","14:58","14:59","15:00"]
klines[KLINE_MAP.Hour]=(stock)=>{
    let _api=`http://data.gtimg.cn/flashdata/hushen/minute/${stock.prefix}${stock.code}.js?maxage=110&rnd=${Math.random()}`
    return new Promise((resolve,reject)=>{
        appendScript(_api).then(()=>{
            let _datas=window['min_data'].split('\n')
            let _klines=[]
            _datas.forEach(data=>{
                // 过滤空字符串和日期
                if(data=="" || data.indexOf('date')!=-1){
                    return true
                }
                let _data=data.split(" ")
                let _time=_data[0].substring(0,2)+":"+_data[0].substring(2,4)
                _klines.push({
                    time:_time,
                    price:parseFloat(_data[1]),
                    volumn:parseInt(_data[2]),
                    rate:((_data[1]-stock.yesterday)/stock.yesterday*100).toFixed(2)
                })
            })
            // 补充数据
            let _start=_klines.length
            for(let _index=_start;_index<_hours.length;_index++){
                _klines.push({
                    time:_hours[_index]
                })
            }
            resolve(_klines)
        })
    })  
}

klines[KLINE_MAP.Five]=(stock)=>{
    let _code=`${stock.prefix}${stock.code}`
    let _api=`http://web.ifzq.gtimg.cn/appstock/app/day/query?_var=fdays_data_${_code}&code=${_code}&r=${Math.random()}`
    return new Promise((resolve,reject)=>{
        appendScript(_api).then(()=>{
            let _datas=window[`fdays_data_${_code}`].data[_code].data
            let _klines=[]
            _datas.reverse()
            _datas.forEach(data=>{
                let _dateData={
                    date:data.date.substring(0,4)+'-'+data.date.substring(4,6)+'-'+data.date.substring(6,8),
                    list:[],
                    prec:data.prec
                }
                let _datas=data.data
                _datas.forEach(_data=>{
                    let __data=_data.split(' ')
                    let _time=__data[0].substring(0,2)+":"+__data[0].substring(2,4)
                    _dateData.list.push({
                        time:_time,
                        price:parseFloat(__data[1]),
                        volumn:parseInt(__data[2]),
                    })
                })
                let _start=_dateData.list.length
                for(let _index=_start;_index<_hours.length;_index++){
                    _dateData.list.push({
                        time:_hours[_index]
                    })
                }
                _klines.push(_dateData)
            })
            resolve(_klines)
        })
    })
}

klines[KLINE_MAP.Day]=(stock)=>{
    let _code=`${stock.prefix}${stock.code}`
    let _api=`http://web.ifzq.gtimg.cn/appstock/app/fqkline/get?_var=kline_dayqfq&param=${_code},day,,,59,qfq&r=${Math.random()}`
    return new Promise((resolve,reject)=>{
        appendScript(_api).then(()=>{
            let _datas=window[`kline_dayqfq`].data[_code]['qfqday'] || window[`kline_dayqfq`].data[_code]['day']
            let _klines=[]
            _datas.forEach(data=>{
                _klines.push({
                    time:data[0],
                    start:parseFloat(data[1]),
                    end:parseFloat(data[2]),
                    high:parseFloat(data[3]),
                    low:parseFloat(data[4]),
                    volumn:parseInt(data[5])
                })
            })
            resolve(_klines)
        })
    })
}

// 排行
const ranks=()=>{
    let _data={
        up:0,
        upRate:0.00,
        zero:0,
        down:0,
        downRate:0.00,
        total:0
    }
    let _api=`http://qt.gtimg.cn/?q=${RANKS.join(',')}&_${Math.random()}`
    return new Promise((resolve,reject)=>{
        appendScript(_api).then(()=>{
            RANKS.forEach(rank=>{
                let _rank=window[`v_${rank}`]
                _rank=_rank.split('~')
                _data.up+=parseInt(_rank[2]) // 上涨
                _data.zero+=parseInt(_rank[3]) // 平
                _data.down+=parseInt(_rank[4]) // 下跌
                _data.total=_data.up+_data.down
            })
            _data.upRate=format((_data.up/_data.total)*100,2)
            _data.downRate=format((_data.down/_data.total)*100,2)
            resolve(_data)
        })
    })
}

// 最新行情
const hq=(code)=>{
    let _api=`http://qt.gtimg.cn/q=${code}`
    return new Promise((resolve,reject)=>{
        appendScript(_api).then(()=>{
            let datas=window[`v_${code}`]
            let _datas=datas.split('~')
            let _index=INDEXS.indexOf(code)==-1?false:true
            let _prefix=code.substring(0,2)
            resolve({
                n:_datas[0],
                index:_index, // 是否指数
                name:_datas[1], // 股票名称
                code:_datas[2], // 股票代码
                prefix:_prefix,
                now:_datas[3], // 现价
                yesterday:parseFloat(_datas[4]), // 昨收
                today:_datas[5], // 今开
                time:_datas[30], // 时间
                timeText:formatDate(_datas[30]),
                max:_datas[33], // 最高
                min:_datas[34], // 最低
                value:_datas[31], // 涨跌值
                rate:_datas[31]>=0?`+${_datas[32]}%`:`${_datas[32]}%`, // 涨跌幅
                rateValue:_datas[32],
                amplitude:`${_datas[43]}%`, // 振幅
                amplitudeNumber:parseFloat(_datas[43]),
                volumn:_index==1?format(_datas[36],0):format(_datas[36],1), // 成交量
                volumnValue:_index==1?format(_datas[37]*10000,0):format(_datas[37]*10000,2), // 成交额
                market:_datas[44], // 流通市值
                total:_datas[45], // 总市值
                turnrate:_datas[38], // 换手率
                marketrate:_datas[46], // 市净率
                perate:_datas[39] // 市盈率
            })
        })
    })
    
}

// 行情简要
const shorts=(codes)=>{
    let _list=[]
    let _codes=[]
    codes.forEach(data=>{
        _codes.push(`s_${data}`)
    })
    let _api=`http://qt.gtimg.cn/q=${_codes.join(',')}`
    return new Promise((resolve,reject)=>{
        appendScript(_api).then(()=>{
            _codes.forEach(_code=>{
                let datas=window[`v_${_code}`]
                let _datas=datas.split('~')
                let _prefix=_code.split('_')[1].substring(0,2)
                _list.push({
                    name:_datas[1], // 股票名称
                    code:_datas[2], // 股票代码
                    prefix:_prefix,
                    now:_datas[3], // 现价
                    value:_datas[4], // 涨跌值
                    rate:_datas[4]>=0?`+${_datas[5]}%`:`${_datas[5]}%`, // 涨跌幅
                    volumn:format(_datas[6]), // 成交量
                    volumnValue:_datas[7], // 成交额
                    total:_datas[9] // 总市值
                })
            })
            resolve(_list)
        })
    })
    
}

// 新闻
const notices=(stock,noticeType)=>{
    let _api=`http://web.ifzq.gtimg.cn/appstock/news/info/search?page=1&symbol=${stock.prefix}${stock.code}&n=51&_var=finance_notice&type=${noticeType}&_appver=1.0&_=${Math.random()}`
    return new Promise((resolve,reject)=>{
        appendScript(_api).then(()=>{
            let _list=window['finance_notice']
            // 限制只取五条
            let _source=_list.data.data
            if(_source.length>5){
                _source=_source.splice(0,5)
            }
            resolve(_source)
        })
    })
}

// 排行
const tops=(params)=>{
    let _api=`http://qt.gtimg.cn/?q=${params.type}&_=${Math.random()}`
    return new Promise((resolve,reject)=>{
        let _list=[]
        appendScript(_api).then(()=>{
            let _source=window[`v_${params.type}`]
            _source=_source.split('^')
            _source.forEach(s=>{
                let _s=s.split('~')
                if(_s.length>1){
                    _list.push({
                        name:_s[0],
                        now:_s[1],
                        rate:_s[2],
                        code:_s[3],
                        prefix:_s[3].substring(0,1)=='6'?'sh':'sz'
                    })
                }
            })
            resolve(_list)
        })
    })
}

const name="tencent"

export default{
    name:name,
    ranks:ranks,
    klines:klines,
    hq:hq,
    shorts:shorts,
    notices:notices,
    tops:tops
}