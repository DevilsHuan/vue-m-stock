<template>
    <div class="tooltip-wrapper" v-show="dataSource.price">
        <div class="tooltip-item" 
        v-for="(data,index) in template" :key="index">
            <span>{{data.title}}:</span>
            <span class="item-value">
                {{data.field?dataSource[data.field]:data.template(dataSource)}}
            </span>
        </div>
    </div>
</template>
<script>
import{KLINE_MAP} from '@/config/'
const templates={
    [KLINE_MAP.Hour]:[{
        title:'价格',
        field:'price'
    },{
        title:'涨跌幅',
        template:(data)=>{
            return (data.rate>=0?'+':'')+data.rate+'%'
        }
    },{
        title:'成交量',
        field:'volumnText'
    },{
        title:'时间',
        field:'time'
    }],
    [KLINE_MAP.Five]:[{
        title:'价格',
        field:'price'
    },{
        title:'成交量',
        field:'volumnText'
    },{
        title:'时间',
        template:(data)=>{
            if(data['time']){
                return data['time'].substring(data['time'].indexOf('-')+1)
            }
        }
    }]
}
export default {
    name:'kline-tooltip',
    props:{
        klineType:{
            type:String,
            default:KLINE_MAP.Hour
        },
        dataSource:Object
    },
    data(){
        return{
            template:templates[this.klineType]
        }
    },
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
.tooltip-wrapper {
    position: absolute;
    top: -20px;
    left:0px;
    right:0px;
    width: auto;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    padding: 0 10px;
  }
  .tooltip-item {
    white-space: nowrap;
    flex:1;
  }
  .tooltip-item span {
    display: inline;
    color: #899198;
    font-size:$size-mini;
    font-weight: bold;
  }
</style>