<template>
    <div class="tabs">
        <ul class="header">
            <li @click="$emit('click',index)" 
            :class="{'active':active==index}"
            v-for="(data,index) in headers" :key="index">{{data}}</li>
        </ul>
        <div class="content" ref="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
const __CLASS__='.tab-item'
export default {
    name:"tabs",
    props:{
        headers:Array,
        active:Number
    },
    data(){
        return{
            length:0,
            init:true
        }
    },
    mounted(){
        this.length=this.$refs.content.querySelectorAll(__CLASS__).length
    },
    watch:{
        active(){
            this.init=false
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
.tabs{
    .header{
        display:flex;
        li{
            flex:1;
            color:$text-d;
            text-align:center;
        }
        .active{
            color:$text-h;
        }
    }
    .content{
        margin-top:20px;
        position:relative;
    }
}
</style>