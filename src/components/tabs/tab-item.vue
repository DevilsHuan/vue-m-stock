<template>
    <div class="tab-item">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'tab-item',
    computed:{
        _class(){
            // 默认渲染不需要特效
            if(this.$parent && !this.$parent.init){
                return 'slide'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
.tab-item{
    width:100%;
    position:relative;
    min-height:200px;
}
</style>