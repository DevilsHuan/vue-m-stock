// f2图表数据适配
import F2 from '@antv/f2'
import {format} from '../util'
import {KLINE_MAP,TIME_TICKS,COLOR_MAP} from '@/config/'
export const klines={
    [KLINE_MAP.Hour]:(stock,datas)=>{
        let _kline={
            list:datas,
            basic:null,
            min:null,
            max:null,
            new:null
        }
        // 处理图表需要的数据格式
        let _history=0
        let _prices=[]
        let _lastVolumn
        datas.forEach((data,index)=>{
            // 涨跌标识
            data.trend = (data.price >= _history) ? 0 : 1
            if(data.volumn){
                if (index > 0) {
                    data.text = data.volumn-_lastVolumn
                } else {
                    data.text = data.volumn
                }
                _lastVolumn = data.volumn
            }
            data.volumnText=format(data.text)
            if(data.price){
                _prices.push(data.price)
                _kline.new=data
                _history=data.price
            }
        })
        let _max=Math.max.apply(this,_prices)
        let _min=Math.min.apply(this,_prices)
        let _maxRate=(_max-stock.yesterday)/stock.yesterday
        let _minRate=(_min-stock.yesterday)/stock.yesterday
        if(_maxRate<0){
            _maxRate*=-1
        }
        if(_minRate<0){
            _minRate*=-1
        }
        let _ratevalue=Math.max.apply(this,[_maxRate,_minRate])
        _kline.max=parseFloat((parseFloat(stock.yesterday)+stock.yesterday*_ratevalue).toFixed(2))
        _kline.min=parseFloat((parseFloat(stock.yesterday)-stock.yesterday*_ratevalue).toFixed(2))
        _kline.ticks=TIME_TICKS
        _kline.basic=stock.yesterday
        if(_kline.min==_kline.max){
            let _v=stock.index==1?0.001:0.1
            _kline.min=(stock.yesterday-stock.yesterday*_v).toFixed(2)
            _kline.max=(stock.yesterday+stock.yesterday*_v).toFixed(2)
        }
        return _kline
    },
    [KLINE_MAP.Five]:(stock,datas)=>{
        let _kline={
            list:datas,
            basic:null,
            min:null,
            max:null,
            new:null
        }
        // 处理图表需要的数据格式
        let _history=0
        let _prices=[]
        let _lastVolumn
        let _ticks=[]
        let _targets=[]
        datas.forEach((_datas,index)=>{
            _ticks.push(_datas.date)
            _datas.list.forEach((data,_index)=>{
                data.trend = (data.price >= _history) ? 0 : 1
                if(data.volumn){
                    if (_index > 0) {
                        data.text = data.volumn-_lastVolumn
                    } else {
                        data.text = data.volumn
                    }
                    _lastVolumn = data.volumn
                }
                data.volumnText=format(data.text)
                if(data.price){
                    _prices.push(data.price)
                    _kline.new=data
                    _history=data.price
                }
                data.time=_datas.date+' '+data.time
                _targets.push(data)
            })
        })
        let _max=Math.max.apply(this,_prices)
        let _min=Math.min.apply(this,_prices)
        _kline.basic=parseFloat(datas[0].prec)
        let _maxRate=(_max-_kline.basic)/_kline.basic
        let _minRate=(_min-_kline.basic)/_kline.basic
        let _ratevalue=Math.max.apply(this,[_maxRate,_minRate])
        _kline.max=(parseFloat(_kline.basic)+_kline.basic*_ratevalue).toFixed(2)
        _kline.min=(parseFloat(_kline.basic)-_kline.basic*_ratevalue).toFixed(2)
        _kline.ticks=_ticks
        
        if(_kline.min==_kline.max){
            let _v=stock.index==1?0.001:0.1
            _kline.min=(_kline.basic-_kline.basic*_v).toFixed(2)
            _kline.max=(_kline.basic+_kline.basic*_v).toFixed(2)
        }
        _kline.list=_targets
        return _kline
    },
    [KLINE_MAP.Day]:(stock,datas)=>{
        let _kline={
            list:datas
        }
        return _kline
    }
}

const LINE={
    labelOffset:5,
    line: {
        stroke: '#222'
    },
    grid: {
        lineWidth: 1,
        stroke: '#222'
    }
}
export const creates={}
creates[KLINE_MAP.Hour]=creates[KLINE_MAP.Five]=(options)=>{
    let data=options.data
    let _charts={
        line:null,
        bar:null
    }
    let chart
    let _bar
    chart = new F2.Chart({
        el:options.el,
        padding: [ 15,15,20,45],
        pixelRatio: window.devicePixelRatio
    })
    chart.source(options.list, {
        time: {
            ticks:options.ticks
        },
        price: {
            ticks:[options.min,options.max]
        }
    })
    chart.axis('time',{
        label(text, index, total) {
            const cfg = {
                fill: '#818991',
                text:text,
                textAlign: 'center'
            };
            if(text=="11:30"){
                cfg.text += '/13:00';
            }
            return cfg;
        },
        ...LINE
    })
    chart.axis('price',{
        label(text, index, total) {
            const cfg = {
                textAlign:'end',
                text,
                fill: '#818991'
            };
            if (index === 0) {
                cfg.textBaseline = 'center';
            } else if (index === (total - 1)) {
                cfg.textBaseline = 'top';
            }
            cfg.text=parseFloat(text).toFixed(2)
            return cfg;
        },
        ...LINE
    })
    if(options.klineType==KLINE_MAP.Five){
        options.ticks.forEach(tick=>{
            let _tick=tick.substring(tick.indexOf('-')+1)
            chart.guide().text({
                content:`${_tick}`,
                position:[`${tick} 11:30`,'min'],
                style: function() {
                    const s = {
                      textBaseline: 'bottom',
                      fill: '#999'
                    };
                    s.textAlign = 'center';
                    return s;
                  }(),
                offsetY: 20
            })
        })
    }
    chart.tooltip({
        alwaysShow: false,
        showCrosshairs: true,
        crosshairsType: 'xy',
        crosshairsStyle: {
          stroke: '#D1D3D4',
          lineWidth: 1
        },
        custom: true,
        onChange(obj) {
            const currentPoint = {
                x: obj.x,
                y: obj.y
            }
            const data = obj.items[0].origin
            options.onChange && options.onChange(data)
            _bar.showTooltip(currentPoint)
        },
        onHide(obj){
            _bar.hideTooltip(1)
            options.onHide && options.onHide()
        }
    })
    chart.guide().line({
        start: [ 'min',options.basic],
        end: [ 'max', options.basic ],
        style: {
            lineDash: [8],
            stroke: '#728B6E'
        }
    })
    chart.guide().text({
        position: [ 'min', options.basic ],
        content: options.basic.toFixed(2),
        style: {
            fill: '#728B6E',
            fontSize: 10,
            fontWeight: 'bold',
            textAlign: 'end',
            textBaseline: 'center'
        },
        offsetX:-5
    })
    chart.line().position('time*price').size(1).color('rgb(6,178,235)')
    chart.area().position('time*price').color('rgb(6,178,235)')
    chart.render()
    _charts.line=chart

    _bar=new F2.Chart({
        el:options.barel,
        padding:[ 0, 15, 0,40],
        pixelRatio: window.devicePixelRatio
    });
    _bar.source(options.list)
    _bar.axis(false)
    _bar.tooltip({
        alwaysShow: false,
        showCrosshairs: true,
        crosshairsStyle: {
            stroke: '#D1D3D4',
            lineWidth: 1
        },
        showTooltipMarker: false,
        custom: true,
        onChange(obj) {
            const currentPoint = {
                x: obj.x,
                y: obj.y
            }
            chart.showTooltip(currentPoint)
        },
        onHide(obj){
            //chart.hideTooltip()
        }
    })
    _bar.interval().position('time*text').color('trend', val => {
        return COLOR_MAP[val]
    })
    _bar.render()
    _charts.bar=_bar
    return _charts
}

creates[KLINE_MAP.Day]=(options)=>{
    // 构造数据结构
    const reportDates = [];
    options.list.forEach(function(obj) {
      reportDates.push(obj.time);
      obj.range = [ obj.start, obj.end, obj.high, obj.low ];
      obj.trend = (obj.start <= obj.end) ? 0 : 1; // 0 表示涨，1 表示跌
    });
    const chart = new F2.Chart({
        id: options.el,
        padding: [15,15,20,45],
        pixelRatio: window.devicePixelRatio
      });
      chart.source(options.list, {
        time: {
          type: 'timeCat',
          ticks:reportDates,
          values: reportDates
        }
      });
      chart.axis('time', {
        label(text, index, total) {
            if(index%15==0){
                const cfg = {
                    fill: '#818991',
                    text:text,
                    textAlign: 'start'
                };
                return cfg;
            }else{
                return null
            }
        },
        ...LINE
      });
      chart.axis('range', {
        label(text, index, total) {
            const cfg = {
                textAlign:'end',
                text,
                fill: '#818991'
            };
            if (index === 0) {
                cfg.textBaseline = 'center';
            } else if (index === (total - 1)) {
                cfg.textBaseline = 'top';
            }
            let _text=text.split('.')
            if(_text.length==2 && text.split('.')[1].length<2){
                cfg.text+='0'
            }
            if(_text.length==1){
                cfg.text+='.00'
            }
            return cfg;
        },
        ...LINE
      });
      chart.tooltip({
        alwaysShow: false,
        showCrosshairs: true,
        crosshairsType: 'xy',
        crosshairsStyle: {
          stroke: '#D1D3D4',
          lineWidth: 1
        },
        custom: true
    })
    chart.schema().position('time*range')
    .color('trend', val => {
        return COLOR_MAP[val];
    }).shape('candle');
    chart.render()
    return{
        line:chart
    }
}