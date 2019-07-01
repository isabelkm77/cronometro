var num_pulsaciones = 0;
var horas = 0;
var minutos = 0;
var segundos = 0;
var horas_set = 0;
var minutos_set = 0;
var segundos_set = 0;
var start_count_down = false;
var setted = false;


$(document).ready(function() {
    $("#control_init").toggle();

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

        $("#init").click(function(){
            $(".keynumber").hide();
        }); 
        
        $("#change").click(function(){
            $(".keynumber").show();
        }); 
        
});


function pressKeyNumber(num){
    var horas_contador = $(".hour").text();
    var minutos_contador = $(".minute").text();
    var segundos_contador = $(".second").text();

    if (start_count_down == false && setted == false){
        if (num_pulsaciones != 0 || num != 0){
            num_pulsaciones++;
        }
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

        paint_chronometer(horas_contador, minutos_contador, segundos_contador);
    }
}

function reset(){
    num_pulsaciones = 0;
    parar();
    paint_chronometer(0, 0, 0);
}

function set(){
    num_pulsaciones = 6;

    var segundos_contador = parseInt($(".second").text(), 10);
    var minutos_contador = parseInt($(".minute").text(), 10);
    var horas_contador = parseInt($(".hour").text(), 10);

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

        paint_chronometer(horas_contador, minutos_contador, segundos_contador);

        toggle_control();
    }

}

function paint_chronometer(horas, minutos, segundos){
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

    $(".hour").text(horas);
    $(".minute").text(minutos);
    $(".second").text(segundos);
}

function iniciar(){
    //    set();
    if(start_count_down == false){
        horas = parseInt($(".hour").text(), 10);
        minutos = parseInt($(".minute").text(), 10);
        segundos = parseInt($(".second").text(), 10);
        start_count_down = true;
        cuenta_atras();
    }
}

function cuenta_atras(){
    if (start_count_down == true){
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
                $(".watch").addClass("aviso_amarillo");
            }
            if(horas == 0 && minutos == 0 && segundos == 0){
                $(".watch").addClass("aviso_rojo");
            }

            paint_chronometer(horas, minutos, segundos);
            setTimeout("cuenta_atras()",1000);
        }
    }
}

function parar(){
    start_count_down = false;
}

function toggle_control(){
    $("#control_set").slideToggle();
    $("#control_init").slideToggle();
    $("#teclado").slideToggle();
}

function cambiar(){
    $(".watch").removeClass("aviso_amarillo");
    $(".watch").removeClass("aviso_rojo");
    reset();
    parar();
    toggle_control();
    setted = false;
}

function reiniciar(){
    parar();
    $(".watch").removeClass("aviso_amarillo");
    $(".watch").removeClass("aviso_rojo");
    paint_chronometer(horas_set, minutos_set, segundos_set);
}

$(document).keyup(function(event) {
    $("#enlace_focus").focus();

    switch (event.keyCode) {
        case 48:
            pressKeyNumber(0);
            break
        case 49:
            pressKeyNumber(1);
            break
        case 50:
            pressKeyNumber(2);
            break
        case 51:
            pressKeyNumber(3);
            break
        case 52:
            pressKeyNumber(4);
            break
        case 53:
            pressKeyNumber(5);
            break
        case 54:
            pressKeyNumber(6);
            break
        case 55:
            pressKeyNumber(7);
            break
        case 56:
            pressKeyNumber(8);
            break
        case 57:
            pressKeyNumber(9);
            break
        case 13: //enter
            if (setted == true){
                if(start_count_down == true){
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
