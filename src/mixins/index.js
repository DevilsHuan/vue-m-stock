import {COLOR_MAP} from '@/config'
export const mixins={
    computed:{
        transition(){
            return 'slide'
        }
    },
    methods:{
        push(path){
            this.$router.push(path)
        },
        pushStock(stock,replace){
            if(!replace){
                this.push(`/detail/${stock.prefix.toLowerCase()}${stock.code}`)
            }else{
                this.$router.replace(`/detail/${stock.prefix.toLowerCase()}${stock.code}`)
            }
        },
        color(value){
            return {
                'color':value<0?COLOR_MAP[1]:COLOR_MAP[0]
            }
        },
        size(name){
            return `size--${name}`
        }
    }
}