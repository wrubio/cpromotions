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
                    console.log(data);
                    if( data.register !== "false"){
                        //-------------------------------------------------
                        //         CREAR TOKEN
                        // -----------------------------------------------
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
                                $(".modal-register").modal('hide');
                                setTimeout(function () {
                                    bootbox.alert({
                                        message: "Te enviamos un correo de confirmación para finalizar el registro",
                                        className: 'bb-alternate-modal'
                                    });
                                    $("#btn-register").remove();
                                }, 600);
                            },
                            failure: function(errMessage){
                                console.log("Error enviando datos de registro");
                            }
                        });
                    } else {
                        $(".register-messsage").html("").append(
                            "<div class='alert alert-danger' role='alert'>"+ data.message +"</div>"
                        )
                    }


                },
                failure: function(errMessage){
                    console.log(errMessage);
                }
            });
        }
    };

    return users
});