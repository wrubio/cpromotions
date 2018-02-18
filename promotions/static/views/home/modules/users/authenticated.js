define([], function () {

    'use strict';

    var users = [];

    users.authenticated = function () {
        (function (){
            $.getJSON("http://127.0.0.1:8000/logged_users/").done(function(data){
                if( data.message === "logged"){
                    $("#li-login, #li-register").css("display", "none");
                    $("#li-welcome, #li-username").css("display", "block");
                    $(".btn-username").html("").append(data.username);
                    $(".email-message").hide();
                    $(".text-message").hide();
                } else {
                    $("#li-login, #li-register").css("display", "block");
                    $("#li-welcome, #li-username").css("display", "none");
                }
            }).fail(function(jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
            });
        })();
    };

    return users;

});