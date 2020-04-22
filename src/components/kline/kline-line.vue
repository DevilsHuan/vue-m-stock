<template>
<div class="chart-wrapper">
    <kline-tooltip :klineType="klineType" v-if="klineType!='day'" :dataSource="current"></kline-tooltip>
    <canvas id="chart" ref="chart" v-show="lineChart"></canvas>
    <canvas id="volumn" ref="volumn" v-show="lineChart"></canvas>
    <loading v-show="!lineChart"></loading>
</div>
</template>
<script>
import {loading} from '../base/'
import klineTooltip from './kline-tooltip.vue'
import {mapActions} from 'vuex'
import{KLINE_MAP} from '@/config/'
import{createKline} from '@/common/js/adaper'
export default {
    name:'kline-line',
    props:{
        stock:Object,
        klineType:String,
        delay:Number
    },
    components:{
        [loading.name]:loading,
        [klineTooltip.name]:klineTooltip
    },
    data(){
        return{
            current:{},
            barChart:null,
            lineChart:null
        }
    },
    mounted(){
        setTimeout(this.draw,this.delay)
    },
    methods:{
        ...mapActions(['klines']),
        draw(){
            let _self=this
            this.klines({stock:this.stock,klineType:this.klineType}).then(data => {
                let _data=data.list
                this.current=data.new
                // 绘制分时折线图
                let _charts=createKline(this.klineType,{
                    el:this.$refs.chart,
                    barel:this.$refs.volumn,
                    ...data,
                    klineType:this.klineType,
                    onChange:(data)=>{
                        _self.current=data
                    },
                    onHide:()=>{
                        _self.current=data.new
                    }
                })
                this.lineChart=_charts.line
                this.barChart=_charts.bar
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
.chart-wrapper {
    min-height:624px;
  }
  canvas#chart {
    width:700px;
    height: 500px;
    margin-top:10px;
  }
  canvas#volumn {
    width:700px;
    height: 100px;
  }
</style>