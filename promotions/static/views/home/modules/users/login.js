define([], function () {

    'use strict'

    var users = [];

    users.login = function () {
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/login_users/",
            data: JSON.stringify({
                username: $("#login-username").val(),
                password: $("#login-password").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                if(data.message === "ok"){
                    window.location.href = "http://127.0.0.1:8000/";
                } else {
                    console.log(data.message); // Traer el texto para mostrar el retorno
                }

            },
            failure: function(errMessage){
                console.log("Error enviando datos de registro");
            }
        });
    };

    return users;
});