// Primer codigo JS
function comenzar(){
    var boton = document.getElementById("grabar");
    boton.addEventListener("click", itemNuevo, false);

}

function itemNuevo(){
    var clave = document.getElementById("clave").value;
    var valor = document.getElementById("valor").value;

    sessionStorage.setItem(clave, valor);
    leer(clave);

    document.getElementById("clave").value = "";
    document.getElementById("valor").value = "";
}

function leer(clave){
    var zonadatos = document.getElementById("zonadatos");

    zonadatos.innerHTML='<div><button onclick="eliminarT()">Eliminar Todo</button></div>';

    //zonadatos.innerHTML="";

    for(i=0; i< sessionStorage.length; i++){
        var clave = sessionStorage.key(i);
        var elvalor = sessionStorage.getItem(clave);
        zonadatos.innerHTML += '<div>Clave: '+clave+'<br>Valor: '+elvalor+'<br><button onclick="eliminarI(\''+clave+'\')">Eliminar</button></div>';
    }
    
}

function eliminarT(){
    if(confirm("Estas seguro?")){
        sessionStorage.clear();
        leer();
    }
}

function eliminarI(clave){
    if(confirm("estas seguro?")){
        sessionStorage.removeItem(clave);
    }
    leer();
}


window.addEventListener("load", comenzar, false);
