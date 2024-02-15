let val = ''
function useSetApp(initVal) {
    if(initVal!=null){
        val = initVal
    }
}
function getApp(){
    return val
}
export {useSetApp,getApp}