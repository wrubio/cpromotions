define([], function () {

    'use strict';

    var users = [];

    users.logout = function () {
        $.getJSON("http://127.0.0.1:8000/logout_users/").done(function(data){
            if( data.message === "ok"){
                window.location.href = "http://127.0.0.1:8000/";
            } else {
                console.log("Error al cerrar sesion");
            }
        }).fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
        });
    };

    return users;
});