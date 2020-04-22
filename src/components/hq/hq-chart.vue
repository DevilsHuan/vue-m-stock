<template>
<section>
    <tabs @click="onChange" :headers="headers" :active="active">
        <tab-item v-for="(chart,index) in charts"
            :key="index"
             v-show="active==index">
             <keep-alive>
                <kline-line 
                :delay="index==0?300:0"
                v-if="active==index" 
                :stock="stock" 
                :klineType="chart.type">
                </kline-line>
             </keep-alive>
        </tab-item>
    </tabs>
</section>
</template>
<script>
import tabs from '../tabs/tabs.vue'
import tabItem from '../tabs/tab-item.vue'
import kline from '../kline/kline-line.vue'
import {KLINE_NAME,KLINE_MAP} from '@/config/'
export default {
    name:'hq-chart',
    components:{
        [tabs.name]:tabs,
        [tabItem.name]:tabItem,
        [kline.name]:kline
    },
    props:{
        stock:Object
    },
    data(){
        return{
            headers:[],
            charts:[],
            active:0
        }
    },
    mounted(){
        for(let k in KLINE_MAP){
            this.headers.push(KLINE_NAME[KLINE_MAP[k]])
            this.charts.push({
                type:KLINE_MAP[k]
            })
        }
    },
    methods:{
        onChange(index){
            this.active=index
        }
    }
}
</script>
<style lang="scss" scoped>

</style>