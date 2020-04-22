<template>
    <section class="wrapper">
        <loading :text="loading" v-if="!list"></loading>
        <no-result v-if="list && list.length==0">
            <slot name="blank">{{blank}}</slot>
        </no-result>
        <slot name="list" v-if="list && list.length>0"></slot>
    </section>
</template>
<script>
import{loading,noResult} from '../base/'
import iscroll from 'iscroll'
export default {
    name:'loading-list',
    components:{
        [loading.name]:loading,
        [noResult.name]:noResult
    },
    props:{
        list:Array,
        loading:String,
        blank:String
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    flex:1;
    min-height:300px;
    position:relative;
    overflow:hidden;
    touch-action:none;
}
</style>