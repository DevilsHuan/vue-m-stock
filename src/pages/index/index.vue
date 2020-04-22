<template>
<transition :name="transition">
<div class="page">
    <search placeholder="请输入股票代码" @click="push('/search')"></search>
    <index class="index-wrapper" @click="pushStock"></index>
    <loading-list class="mine-wrapper" 
    loading="数据加载中~" blank="你还没有自选股哟~"
    :list="dataSource.list">
        <template slot="blank"></template>
        <template slot="list">
            <scroll>
                <list-table
                :dataSource="dataSource" 
                @click="pushStock">
                </list-table>
            </scroll>
        </template>
    </loading-list>
</div>
</transition>
</template>
<script>
import {index,search,loadingList,$components} from '@/components/'
import {listTable,scroll} from '@/components/base'
import {mapGetters, mapActions} from 'vuex'
export default {
    components:$components([
        index,loadingList,listTable,
        search,scroll
    ]),
    data(){
        return{
            dataSource:{
                columns:[
                    {
                        title:'股票名称',
                        render:(data)=>{
                            return `<p>${data.name}</p><p style="font-size:12px;opacity:0.6;">${data.code}.${data.prefix}</p>`
                        }
                    },{
                        title:'最新价',
                        field:'now',
                        class:"center",
                        style:(v,column)=>this.color(v.value)
                    },{
                        title:'涨跌幅',
                        field:'rate',
                        class:"center",
                        style:(v,column)=>this.color(v.value)
                    },{
                        title:'成交额',
                        field:'volumn',
                        class:"center"
                    }
                ],
                list:this.mines
            }
        }
    },
    computed:{
        ...mapGetters(['mines'])
    },
    created(){
        this.shortByFrees()
    },
    methods:{
        ...mapActions(['shortByFrees'])
    },
    watch:{
        mines(){
            this.dataSource.list=this.mines
        }
    }
}
</script>
<style lang="scss" scoped>
.index-wrapper{
    margin-top:0px;
}
</style>