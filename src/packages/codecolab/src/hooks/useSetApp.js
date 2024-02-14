let val = ''
function useSetApp(initVal) {
    if(initVal!=null){
        val = initVal
    }
}
function getApp(initVal){
    return val
}
export {useSetApp,getApp}