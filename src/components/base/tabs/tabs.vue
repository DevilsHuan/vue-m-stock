<template>
    <div class="tabs">
        <ul class="header">
            <li v-for="(tab,index) in source" 
            :class="{'active':active==index}"
            @click="change(index)"
            :key="index">
                {{tab.title}}
            </li>
        </ul>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name:'tabs',
    props:{
        source:Array
    },
    data(){
        return{
            active:0
        }
    },
    methods:{
        change(_index){
            this.active=_index
            this.$emit('change',_index)
        }
    }
}
</script>
<style lang="scss" scoped>
.tabs{
    .header{
        display:flex;
        li{
            flex:1;text-align:center;
            opacity:0.6;
            padding:10px 0px;
            &.active{
                opacity:1;
                position:relative;
            }
        }
    }
}
</style>