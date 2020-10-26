export const getRedirectTo = user => {
    const {type, header} = user
    let path = ''
    if(type==='laoban'){
        path = '/laoban'
    }else if(type==='dashen'){
        path = '/dashen'
    }

    if(!header){
        path += '-info'
    }

    return path
}