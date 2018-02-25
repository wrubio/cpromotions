define([], function () {

    'use strict'

    var users = [];

    users.login = function () {
        $.ajax({
            type: "POST",
            url: "https://cpromotion.herokuapp.com/login_users/",
            data: JSON.stringify({
                username: $("#login-username").val(),
                password: $("#login-password").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                if(data.message === "ok"){
                    window.location.href = "https://cpromotion.herokuapp.com/";
                } else {
                    if(data.message === "false"){
                        bootbox.alert({
                            message: "Te enviamos un correo de confirmación para finalizar el registro, por favor verifica tu correo para poder acceder.",
                            className: 'bb-alternate-modal'
                        });
                    } else {
                        $(".login-message").html("").append(
                            "<div class='alert alert-danger' role='alert' style='padding: 5px 15px;'>"+ data.message +"</div>"
                        )
                    }
                }

            },
            failure: function(errMessage){
                console.log("Error enviando datos de registro");
            }
        });
    };

    return users;
});