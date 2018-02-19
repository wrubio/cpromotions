define([], function () {


    'use strict';

    var promotion = [];

    promotion.addMessage = function () {
        var emailMessage = $("#email-message");
        var textMessage = $("#text-message");
        var promotion = $("#modal-promo-name").html();
        if(emailMessage.val() === "" || textMessage.val() === ""){
            console.log("por favor agrega un correo");
        } else {
            //Openiendo codigo csrf para el registro
            var csrftoken = Cookies.get('csrftoken');
            function csrfSafeMethod(method) {
                // these HTTP methods do not require CSRF protection
                return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
            }
            $.ajaxSetup({
                beforeSend: function(xhr, settings) {
                    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "https://cpromotion.herokuapp.com/add_message/",
                data: JSON.stringify({
                    email: emailMessage.val(),
                    message: textMessage.val(),
                    promotion: promotion
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    $("#created-message").prepend(
                        "<div class='form-group'>" +
                        "<label for='exampleInputEmail1'>"+emailMessage.val()+": </label>" +
                        "<div class='promo-message-tittle'>"+textMessage.val()+"</div>" +
                        "</div>" +
                        "<hr>"
                    );
                    console.log(data);
                },
                failure: function(errMessage){
                    console.log("Error enviando datos de registro");
                }
            });
        }
    };

    return promotion;

});