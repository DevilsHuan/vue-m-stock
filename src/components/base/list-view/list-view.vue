<template>
    <div class="list-view" 
    :style="{'flex-wrap':wrap?'wrap':'nowrap',
    'flex-direction':direction || 'rows'}">
        <div class="item" 
        v-for="(item,index) in list" :key="index"
        :style="{'flex-basis':columns?(100/columns)+'%':'100%'}">
            <slot name="item" v-bind:item="item"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name:'list-view',
    props:{
        wrap:Boolean,
        columns:Number,
        direction:String,
        list:Array
    }
}
</script>
<style lang="scss" scoped>
.list-view{
    display:flex;
    .item{
        flex-grow:0;
        flex-shrink:0;
    }
}
</style>