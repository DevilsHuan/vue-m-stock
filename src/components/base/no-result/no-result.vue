<template>
    <div class="no-result">
        <div class="image" :class="size('biggest')">M</div>
        <div class="text" :class="size('small')" >
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name:"no-result"
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/mixin.scss';
.no-result{
    position:absolute;
    width:auto;
    height:auto;
    left:0px;right:0px;
    top:0px;bottom:0px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    .image{
        text-align:center;
        opacity:0.6;
    }
    .text{
        margin-top:10px;
        opacity:0.6;
    }
}
</style>