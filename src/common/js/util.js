const formats=[
    {value:100000000,name:'亿'},
    {value:10000,name:'万'}
]

/**
 * 数字单位格式化
 * @param {*} number 
 */
export function format(number,fixed=2){
    if(typeof(number)!='number'){
        number=parseFloat(number)
    }
    if(isNaN(number)){
        return '--'
    }
    for(let item of formats){
        if(number>=item.value){
            return ((number/item.value).toFixed(fixed))+item.name
        }
    }
    return number
}

/**
 * 日期格式化
 * @param {*} str 待格式化日期字符串 20200220121430
 * @param {*} format 格式
 */
export function formatDate(str,format){
    let _date=Date.parse(str)
    if(isNaN(_date)){
        _date=str.substring(0,4)+'-'+str.substring(4,6)+'-'+str.substring(6,8)
        _date+=' '+str.substring(8,10)+':'+str.substring(10,12)+':'+str.substring(12,14)
    }
    return _date
}

/**
 * 
 * @param {*} url 
 */
export function appendScript(url){
    let _script=document.createElement('script')
    _script.src=url
    document.body.appendChild(_script)
    return new Promise((resolve,reject)=>{
        _script.onload=()=>{
            document.body.removeChild(_script)
            resolve()
        }
    })
}