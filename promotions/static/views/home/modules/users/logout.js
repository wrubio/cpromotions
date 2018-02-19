define([], function () {

    'use strict';

    var users = [];

    users.logout = function () {
        $.getJSON("https://cpromotion.herokuapp.com/logout_users/").done(function(data){
            if( data.message === "ok"){
                window.location.href = "https://cpromotion.herokuapp.com/";
            } else {
                console.log("Error al cerrar sesion");
            }
        }).fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
        });
    };

    return users;
});