if(localStorage.getItem('token') !== null){
    if(localStorage.getItem('usuario') !== null){
        if(localStorage.getItem('usuario') == 's'){
            if(location.href.split('/')[location.href.split('/').length - 1] === 'administracion.html'
            && location.href.split('/')[location.href.split('/').length - 2] === 'super-usuario'){
                console.log('no cargar')
            }else{
                location.href = "../super-usuario/administracion.html"
            }
        }else{
            if(location.href.split('/')[location.href.split('/').length - 1] === 'administracion.html'
            && location.href.split('/')[location.href.split('/').length - 2] === 'administrador'){
                console.log('no cargar')
            }else{
                location.href = "../administrador/administracion.html"
            }
        }
    }
}else{
    location.href = "../../login.html"
}

$("#logout").click(function(){
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('nombre')
    location.href = "../../login.html"
})