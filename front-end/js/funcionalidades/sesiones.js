if(localStorage.getItem('token') !== null){
    if(localStorage.getItem('usuario') !== null){
        if(localStorage.getItem('usuario') == 's'){
            location.href = "paginas/super-usuario/administracion.html"
        }else{
            location.href = "paginas/administrador/administracion.html"
        }
    }
}