<template>
<transition name="slide">
    <div class="page page-search">
        <search placeholder="请输入股票代码/股票名称" :cancel="true" @cancel="push('/')" @input="onInput"></search>
        <section class="history" v-if="keyword==''">
            <list-view :wrap="true" :columns="3" :list="historyList" v-if="historyList">
                    <template v-slot:item="{item}">
                    <div class="wrapper">
                        <p>{{item.name}}</p>
                        <p>{{item.code}}.<span>{{item.prefix}}</span></p>
                    </div>
                    </template>
            </list-view>
            <no-result v-if="!historyList || historyList.length==0">
                还没有搜索历史哟~
            </no-result>
        </section>
        <loading-list class="searchs" blank="未搜索到相关股票"
        :list="list" v-if="keyword!=''">
            <template slot="list">
                <list-view :wrap="true" :columns="3" :list="list">
                     <template v-slot:item="{item}">
                        <div class="wrapper" @click="onClick(item)">
                            <p>{{item.name}}</p>
                            <p>{{item.code}}.<span>{{item.prefix}}</span></p>
                        </div>
                     </template>
                </list-view>
            </template>
        </loading-list>
    </div>
</transition>
</template>
<script>
import {search,loadingList,$components} from '@/components/'
import {noResult,listView} from '@/components/base/'
import {mapActions, mapGetters} from 'vuex'
export default {
    components:$components([search,noResult,loadingList,listView]),
    data(){
        return{
            historyList:null,
            list:null,
            keyword:''
        }
    },
    computed:{
        ...mapGetters(['history'])
    },
    mounted(){
        this.historyList=this.history()
    },
    methods:{
        ...mapActions(['search','addHistory']),
        onInput(value){
            this.keyword=value
            this.search(this.keyword).then(list=>{
                this.list=list
            })
        },
        onClick(stock){
            this.addHistory(stock)
            this.pushStock(stock,true)
        }
    }
}
</script>
<style lang="scss" scoped>
.page-search{
    .history,.searchs{
        position:relative;
        flex:1;
    }
    .wrapper{
        padding:20px 10px;
        text-align:center;
    }
}
</style>