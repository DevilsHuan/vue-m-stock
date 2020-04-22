<template>
<section>
    <tabs :source="source" @change="change">
        <tab-item v-for="(data,i) in source"
        class="extend-item" :key="i" v-show="active==i">
            <loading-list loading="数据加载中~" blank="还没有数据哟~" :list="data.list">
                <template slot="blank"></template>
                <template slot="list" v-if="data.template==0">
                    <ul>
                        <li v-for="(obj,index) in data.list" :key="index">
                            <p>{{obj.title}}</p>
                            <p class="time" :class="size('small')">{{obj.time}}</p>
                        </li>
                    </ul>
                </template>

                <template slot="list" v-if="data.template==1">
                    <list-table
                    :dataSource="data.dataSource" 
                    @click="pushStock">
                    </list-table>
                </template>
            </loading-list>
        </tab-item>
    </tabs>
</section>
</template>
<script>
import tabs from '../base/tabs/tabs.vue'
import tabItem from '../tabs/tab-item.vue'
import loadingList from '../loading-list/loading-list.vue'
import listTable from '../base/list-table/list-table.vue'
import {EXTENDS} from '@/config/'
import{mapActions} from 'vuex'
export default {
    name:'hq-extend',
    components:{
        [tabs.name]:tabs,
        [tabItem.name]:tabItem,
        [loadingList.name]:loadingList,
        [listTable.name]:listTable
    },
    props:{
        stock:null
    },
    data(){
        return{
            source:[],
            active:0
        }
    },
    created(){
        this.init()
    },
    methods:{
        ...mapActions(['notices','tops']),
        init(){
            this.source=EXTENDS.filter((item)=>{
                return item.index==this.stock.index
            })
            this.render()
        },
        change(_index){
            this.active=_index
            this.render()
        },
        render(){
            let _data=this.source[this.active]
            if(_data && !_data.list){
                this[_data.render]({stock:this.stock,..._data.params}).then(_list=>{
                    _data.list=_list
                    if(_data.dataSource){
                        _data.dataSource.list=_list
                    }
                    this.$nextTick(()=>{
                        this.$parent.refresh()
                    })
                })
            }
        }
    },
    watch: {
        'stock'() {
            this.init()
        }
    }
}
</script>
<style lang="scss" scoped>
.extend-item{
    li{
        padding:10px 0px;
    }
}
</style>