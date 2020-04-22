<template>
    <span class="button" @click="$emit('click')">
        <span :class="'icon-'+icon" v-if="icon"></span>
        <span class="text">{{text}}</span>
    </span>
</template>
<script>
export default {
    name:'m-button',
    props:{
        icon:String,
        text:String
    }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
.button{
    display:flex;
    justify-content:center;
    align-items:center;
    padding:5px 10px;
    border:2px solid #fff;
    border-radius:$radis-small;
    opacity:0.6;
    .text{
        margin-left:2px;
    }
}
</style>