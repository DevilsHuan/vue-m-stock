<template>
    <section class="search">
        <div class="wrapper">
            <i class="icon-search"></i>
            <input type="text" ref="searchInput" 
            @input="onInput" @click="$emit('click')"
            v-model="value" :placeholder="placeholder">
        </div>
        <span v-if="cancel" @click="$emit('cancel')">取消</span>
    </section>
</template>
<script>
export default {
    name:'search',
    props:{
        placeholder:String,
        cancel:Boolean
    },
    data(){
        return{
            value:''
        }
    },
    methods:{
        onInput(){
            this.$emit('input',this.value)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
.search{
    display:flex;
    align-items:center;
    .wrapper{
        flex:1;
        display:flex;
        align-items:center;
        border-radius:$radius;
        padding-left:20px;
    }
    input{
        height:70px;
        width:100%;
        border:0px;
        margin-left:20px;
        outline:0px none;
        font-size:$size;
    }
    span{
        flex:0 0 100px;
        width:100px;
        text-align:center;
        color:#00adcd;
    }
}
</style>