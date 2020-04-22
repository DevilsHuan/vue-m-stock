<template>
    <section class="base number" :class="{'number--down':stock.value<0}">
        <div class="name">
            <span :class="size('big')">{{stock.name}}({{stock.code}}.{{stock.prefix}})</span>
            <span class="time" :class="size('small')">{{stock.timeText}}</span>
        </div>
        <ul class="list-base">
            <li class="change" :class="size('biggest')">{{stock.now}}</li>
            <li class="change">
                <p>{{stock.value>=0?'+':''}}{{stock.value}}</p>
                <p>{{stock.rate}}</p>
            </li>
            <li v-show="!stock.index">
                <m-button :class="size('small')" v-show="!stock.free" text="添加自选" @click="addFree(stock)"></m-button>
                <m-button :class="size('small')" v-show="stock.free" text="取消自选" @click="removeFree(stock)"></m-button>
            </li>
        </ul>
        <list-view :wrap="true" :columns="3" :list="maps" :class="size('small')">
            <template v-slot:item="{item}">
                <div class="base-item" v-show="(stock.index==1 && item.index!=0) || !stock.index">
                    <span>{{item.title}}</span>
                    <span :class="{'change':item.static!=1}">{{stock[item.field]}}</span>
                </div>
            </template>
        </list-view>
    </section>
</template>
<script>
import {button,listView} from '../base'
import {mapActions, mapGetters} from 'vuex'
import{MAPS} from '@/config/'
export default {
    name:'hq-base',
    components:{
        [button.name]:button,
        [listView.name]:listView
    },
    props:{
        stock:Object
    },
    data(){
        return{
            maps:MAPS
        }
    },
    methods:{
        ...mapActions(['addFree','removeFree'])
    }
}
</script>
<style lang="scss" scoped>
.base{
    .time{
        margin-left:10px;
    }
    .list-base{
        display:flex;
        align-items:center;
        li{flex:1;}
        li:first-child,li:last-child{flex:0 0 150px;}
    }
    .base-item{
        padding:5px 0px;
        display:flex;
        span{flex:1;}
    }
}
</style>