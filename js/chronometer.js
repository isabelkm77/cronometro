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
    var key_hours = $(".hour").text();
    var key_minutes = $(".minute").text();
    var key_seconds = $(".second").text();
    
    if (start_count_down == false && setted == false){
        if (num_pulsaciones != 0 || num != 0){
            num_pulsaciones++;
        }
        if (num_pulsaciones <= 6){
            key_hours = key_hours.charAt(1) + key_minutes.charAt(0);
            key_minutes = key_minutes.charAt(1) + key_seconds.charAt(0);
            key_seconds = key_seconds.charAt(1) + "" + num;          
        }else{
            num_pulsaciones = 1;
            key_hours = 0;
            key_minutes = 0;
            key_seconds = num;
        }

        paint_chronometer(key_hours, key_minutes, key_seconds);
    }
}

function reset(){
    num_pulsaciones = 0;
    parar();
    paint_chronometer(0, 0, 0);
}

function set(){
    num_pulsaciones = 6;

    var key_seconds = parseInt($(".second").text(), 10);
    var key_minutes = parseInt($(".minute").text(), 10);
    var key_hours = parseInt($(".hour").text(), 10);

    if (key_seconds >= 60){
        key_seconds -= 60;
        key_minutes++;
    }

    if (key_minutes >= 60){
        key_minutes -= 60;
        key_hours++;
    }

    horas_set = key_hours;
    minutos_set = key_minutes;
    segundos_set = key_seconds;

    if(horas_set != 0 || minutos_set != 0 || segundos_set != 0){
        setted = true;

        paint_chronometer(key_hours, key_minutes, key_seconds);

        toggle_control();
    }

}

function paint_chronometer(hours, minutes, seconds){
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
    seconds = parseInt(seconds, 10);
 
    if (hours < 10){
        hours = "0" + hours;
    }
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (seconds < 10){
        seconds = "0" + seconds;
    }

    $(".hour").text((hours));
    $(".minute").text((minutes));
    $(".second").text(seconds);
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
    $(".keynumber").slideToggle();
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
