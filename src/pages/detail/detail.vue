<template>
<transition :name="transition">
    <div class="page page-detail">
        <scroll v-if="stock">
            <hq-base :stock="stock"></hq-base>
            <hq-chart :stock="stock" :key="stock.code"></hq-chart>
            <hq-extend :stock="stock"></hq-extend>
        </scroll>
    </div>
</transition>
</template>
<script>
import {hqBase,hqChart,hqExtend,$components} from '@/components/'
import {scroll} from '@/components/base/'
import {mapActions} from 'vuex'
export default {
    components:$components([
        hqBase,hqChart,hqExtend,scroll
    ]),
    data(){
        return{
            stock:null
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        ...mapActions(['hq']),
        init(){
            let _code=this.$route.params['code']
            this.hq(_code).then(datas=>{
                this.stock=datas
                document.title=`${datas.name} ${datas.now} ${datas.value}(${datas.rate})`
            })
        }
    },
    watch: {
        '$route' (to, from) {
            this.init()
        }
    }
}
</script>
<style lang="scss" scoped>
.page-detail{
    padding-top:20px;
}
</style>