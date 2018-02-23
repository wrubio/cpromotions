define([], function(){

    'use struct';

    var users = [];

    users.register = function(){
        var getCheckCategory = $('.register-category');
        var checkedCategory;
        for(var cc=0; cc<getCheckCategory.length; cc++) {
            var checkCategory = getCheckCategory.eq(cc);
            if (checkCategory.is(':checked')){
                if(checkedCategory != undefined) {
                    checkedCategory = checkedCategory + "-" + checkCategory.val();
                } else {
                    checkedCategory = checkCategory.val();
                }
            }
        }
        if( $("#register-password").val() != $("#register-confirm-password").val() ){
            console.log("las contraseñas no coinciden");
        } else {
            $.ajax({
                type: "POST",
                url: "https://cpromotion.herokuapp.com/register_users/",
                data: JSON.stringify({
                    first_name: $("#register-name").val(),
                    last_name: $("#register-last-name").val(),
                    country: $("#register-country").val(),
                    city: $("#register-city").val(),
                    address: $("#register-address").val(),
                    username: $("#register-username").val(),
                    password: $("#register-password").val(),
                    email: $("#register-email").val(),
                    category: checkedCategory
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    console.log("Te enviamos un correo de confirmación");
                //    window.location.href = "https://cpromotion.herokuapp.com/";

                //-------------------------------------------------
                //         CREAR TOKEN
                // ------------------------------------------------

                    $.ajax({
                        type: "POST",
                        url: "https://cpromotion.herokuapp.com/crear_token/",
                        data: JSON.stringify({

                             user_id:data[0]["pk"],
                             name: $("#register-name").val(),
                             email: $("#register-email").val(),
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function(data){
                            console.log(data);
                            console.log('hemos enviado un mensaje a tu correo para que valides tu cuenta.' )
                            window.location.href = "https://cpromotion.herokuapp.com/";
                        },
                        failure: function(errMessage){
                            console.log("Error enviando datos de registro");
                        }
                    });

                },
                failure: function(errMessage){
                    console.log("Error enviando datos de registro");
                }
            });
        }
    };

    return users
});