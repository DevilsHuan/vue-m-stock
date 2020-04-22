export const _colorMap=['#f03a4f', '#00ca66']
const _columns=[
    {
        title:'股票名称',
        field:'name',
    },{
        title:'现价',
        field:'now',
        class:"center"
    },{
        title:'涨跌幅',
        class:"center",
        render:(v)=>{
            return v.rate>=0?`+${v.rate}%`:`${v.rate}%`
        },
        style:(v,column)=>{
            return {'color':v.rate>=0?_colorMap[0]:_colorMap[1]}
        }
    }
]
const _default={
    columns:_columns,
    list:null
}
const _df={
    columns:_columns,
    list:null
}
const _cj=JSON.parse(JSON.stringify(_default))
_cj.columns[2]={
    title:'成交额(亿)',
    class:"center",
    render:(v)=>{
        return (v.rate/10000).toFixed(2)
    }
}
const _hs=JSON.parse(JSON.stringify(_default))
_hs.columns[2]={
    title:'换手率',
    class:"center",
    render:(v)=>{
        return `${v.rate}%`
    }
}
export const _extends=[
    {title:'公告',render:'notices',params:{noticeType:0},list:null,index:0,template:0},
    {title:'新闻',render:'notices',params:{noticeType:2},list:null,index:0,template:0},
    {title:'涨幅',render:'tops',params:{type:'azdftop10'},list:null,dataSource:_default,index:1,template:1},
    {title:'跌幅',render:'tops',params:{type:'azdfend10'},list:null,dataSource:_df,index:1,template:1},
    {title:'金额',render:'tops',params:{type:'acjetop10'},list:null,dataSource:_cj,index:1,template:1},
    {title:'换手率',render:'tops',params:{type:'ahsltop10'},list:null,dataSource:_hs,index:1,template:1}
]