<template>
    <div class="scroll-inner">
        <slot></slot>
    </div>
</template>
<script>
import iscroll from 'iscroll'
export default {
    name:"scroll",
    props:{
        bounce:Boolean
    },
    data(){
        return{
            instance:null
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.$parent.$el.style['touchAction']="none";
            this.$parent.$el.style['overflow']="hidden";
            this.instance=new iscroll(this.$parent.$el,{bounce:this.bounce || false})
        })
    },
    methods:{
        refresh(){
            this.instance.refresh()
        }
    }
}
</script>