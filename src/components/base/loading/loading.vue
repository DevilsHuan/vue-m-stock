<template>
    <div class="loading">
        <div class="image"></div>
        <div class="text" :class="size('small')">
            <slot>{{text}}</slot>
        </div>
    </div>    
</template>
<script>
export default {
    name:'loading',
    props:{
        text:String
    }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/mixin.scss';
.loading{
    position:absolute;
    left:0px;right:0px;
    width:auto;
    height:auto;
    left:0px;right:0px;
    top:0px;bottom:0px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    .image{
        width:60px;
        height:60px;
        @include background('loading.gif');
    }
    .text{
        margin-top:20px;
        opacity:0.6;
    }
}
</style>