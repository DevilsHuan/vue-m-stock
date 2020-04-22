<template>
    <section class="index-numbers">
        <list-view class="list" :wrap="true" :columns="3" :list="indexs">
            <template v-slot:item="{item}">
                <div class="wrapper number" 
                @click="$emit('click',item)"
                :class="{'number--down':item.value<0}">
                    <div>{{item.name}}</div>
                    <div class="change now">{{item.now}}</div>
                    <div class="change" :class="size('small')">{{item.value}}({{item.rate}})</div>
                </div>
            </template>
        </list-view>
    </section>
</template>
<script>
import {listView} from '../base/'
import {mapActions, mapGetters} from 'vuex'
// 指数组件
export default {
    name:'index',
    components:{
        [listView.name]:listView
    },
    computed:{
        ...mapGetters(['indexs'])
    },
    created(){
        this.indexHq()
    },
    methods:{
        ...mapActions(['indexHq'])
    }
}
</script>
<style lang="scss" scoped>
.index-numbers{
    padding:10px 0px;
    .wrapper{
        text-align:center;
        .now{margin-top:10px;}
    }
}
</style>