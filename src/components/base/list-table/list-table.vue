<template>
    <div class="list-table">
        <list-view class="header"
        :list="dataSource.columns" :class="size('small')"
        :columns="dataSource.columns.length">
            <template v-slot:item="{item}">
                <div :class="item.class">{{item.title}}</div>
            </template>
        </list-view>
        <list-view class="content"
        :list="dataSource.list" direction="column">
            <template v-slot:item="{item}">
                <ul>
                    <li v-for="(column,index) in dataSource.columns" 
                    :key="index" v-html="render(column,item)" 
                    :class="column.class" 
                    @click="$emit('click',item)"
                    :style="column.style && column.style(item,column)">
                    </li>
                </ul>
            </template>
        </list-view>
    </div>
</template>
<script>
// 表格组件，数据格式如下
/**
 * {
 *      list:[{'column1':'value01','column2':'value02'}],
 *      columns:[{'column1':'columntext','column1':{name:'columntext',style:{'text-align':'center'}}}]
 * }
 */
import listView from '../list-view/list-view.vue'
export default {
    name:'list-table',
    props:{
        dataSource:Object
    },
    components:{
        [listView.name]:listView
    },
    methods:{
        render(column,data){
            if(column.field){
                return data[column.field]
            }
            return column.render(data)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/mixin.scss';
.header{
    opacity:0.8;
    margin-bottom:20px;
}
.content ul{
    display:flex;
    li{
        flex:1;
    }
}
</style>