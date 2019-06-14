$(document).ready(function() {
    $("#control_iniciar").toggle();

});

$(function(){
    //hover states on the static widgets
    $('#dialog_link, ul#icons li, .ui-button').hover(
        function() {
            $(this).addClass('ui-state-hover');
        },
        function() {
            $(this).removeClass('ui-state-hover');
        }
        );
});

var num_pulsaciones = 0;
var horas = 0;
var minutos = 0;
var segundos = 0;
var horas_set = 0;
var minutos_set = 0;
var segundos_set = 0;
var cuenta_atras_iniciada = false;
var setted = false;

function pulsar(num){
    if (cuenta_atras_iniciada == false && setted == false){
        if (num_pulsaciones != 0 || num != 0){
            num_pulsaciones++;
        }

        var horas_contador = $("#horas").text();
        var minutos_contador = $("#minutos").text();
        var segundos_contador = $("#segundos").text();

        if (num_pulsaciones <= 6){
            horas_contador = horas_contador.charAt(1) + minutos_contador.charAt(0);
            minutos_contador = minutos_contador.charAt(1) + segundos_contador.charAt(0);
            segundos_contador = segundos_contador.charAt(1) + "" + num;
        }else{
            num_pulsaciones = 1;
            horas_contador = 0;
            minutos_contador = 0;
            segundos_contador = num;
        }

        pintar(horas_contador, minutos_contador, segundos_contador);
    }
}

function reset(){
    num_pulsaciones = 0;
    parar();
    pintar(0, 0, 0);
}

function set(){
    num_pulsaciones = 6;

    var segundos_contador = parseInt($("#segundos").text(), 10);
    var minutos_contador = parseInt($("#minutos").text(), 10);
    var horas_contador = parseInt($("#horas").text(), 10);

    if (segundos_contador >= 60){
        segundos_contador -= 60;
        minutos_contador++;
    }

    if (minutos_contador >= 60){
        minutos_contador -= 60;
        horas_contador++;
    }

    horas_set = horas_contador;
    minutos_set = minutos_contador;
    segundos_set = segundos_contador;

    if(horas_set != 0 || minutos_set != 0 || segundos_set != 0){
        setted = true;

        pintar(horas_contador, minutos_contador, segundos_contador);

        toggle_control();
    }

}

function pintar(horas, minutos, segundos){
    horas = parseInt(horas, 10);
    minutos = parseInt(minutos, 10);
    segundos = parseInt(segundos, 10);

    if (horas < 10){
        horas = "0" + horas;
    }
    if (minutos < 10){
        minutos = "0" + minutos;
    }
    if (segundos < 10){
        segundos = "0" + segundos;
    }

    $("#horas").text(horas);
    $("#minutos").text(minutos);
    $("#segundos").text(segundos);
}

function iniciar(){
    //    set();
    if(cuenta_atras_iniciada == false){
        horas = parseInt($("#horas").text(), 10);
        minutos = parseInt($("#minutos").text(), 10);
        segundos = parseInt($("#segundos").text(), 10);
        cuenta_atras_iniciada = true;
        cuenta_atras();
    }
}

function cuenta_atras(){
    if (cuenta_atras_iniciada == true){
        segundos = segundos - 1;
        if(segundos < 0){
            segundos = 59;
            minutos = minutos - 1;
        }
        //    form.second.value = segundos;

        if (minutos < 0){
            minutos = 59;
            horas = horas - 1;
        }
        //    form.minute.value = minutos;

        //    form.hour.value = horas;
        if (horas < 0){
            //final
            reset();
        }else{

            if(horas == 0 && minutos == 0){
                $("#reloj").addClass("aviso_amarillo");
            }
            if(horas == 0 && minutos == 0 && segundos == 0){
                $("#reloj").addClass("aviso_rojo");
            }

            pintar(horas, minutos, segundos);
            setTimeout("cuenta_atras()",1000);
        }
    }
}

function parar(){
    cuenta_atras_iniciada = false;
}

function toggle_control(){
    $("#control_set").slideToggle();
    $("#control_iniciar").slideToggle();
    $("#teclado").slideToggle();
}

function cambiar(){
    $("#reloj").removeClass("aviso_amarillo");
    $("#reloj").removeClass("aviso_rojo");
    reset();
    parar();
    toggle_control();
    setted = false;
}

function reiniciar(){
    parar();
    $("#reloj").removeClass("aviso_amarillo");
    pintar(horas_set, minutos_set, segundos_set);
}

$(document).keyup(function(event) {
    // 0 = 48
    // 1 = 49
    // 9 = 57
    // enter = 13
    // esc = 27
    // backspace = 8
    //    alert(event.keyCode);
    $("#enlace_focus").focus();

    switch (event.keyCode) {
        case 48:
            pulsar(0);
            break
        case 49:
            pulsar(1);
            break
        case 50:
            pulsar(2);
            break
        case 51:
            pulsar(3);
            break
        case 52:
            pulsar(4);
            break
        case 53:
            pulsar(5);
            break
        case 54:
            pulsar(6);
            break
        case 55:
            pulsar(7);
            break
        case 56:
            pulsar(8);
            break
        case 57:
            pulsar(9);
            break
        case 13: //enter
            if (setted == true){
                if(cuenta_atras_iniciada == true){
                    parar();
                }else{
                    iniciar();
                }
            }else{
                set();
            }
            break
        case 27: //esc
            if (setted == true){
                cambiar();
            }else{
                reset();
            }
            break
        case 8: //backspace
            if (setted == true){
                reiniciar();
            }else{
                reset();
            }
            break
    }
});
