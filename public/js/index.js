let txt = document.getElementById('txt');
function reloj() {

    let fecha = new Date();

    let hora = fecha.getHours();
    
    let minutos = fecha.getMinutes();
    
    if (minutos <10) {
        segundos = "0" + minutos;
    }
    
    let segundos = fecha.getSeconds();
    
    if (segundos <10) {
        segundos = "0" + segundos;
    }
    

        txt.innerText = hora + ":" + minutos + ":" + segundos;
    }
    

    
    reloj();

    setInterval( reloj , 1000 );
    

    let fecha = document.getElementById( 'fecha' );
    let fecha1 = new Date();


let diaMes= fecha1.getDate();


if (diaMes<10){
    diaMes="0"+diaMes;

}else{
    diaMes = diaMes;
}


let mes = fecha1.getMonth()+1;

if(mes<10){
    mes="0"+mes;
}


let anio = fecha1.getFullYear();

fecha.innerText = diaMes+"/"+mes+"/"+anio;

