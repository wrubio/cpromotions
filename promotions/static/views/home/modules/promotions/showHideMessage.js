define([], function () {

    'use strict';

    var promotion = [];

    promotion.showHideMessage = function () {

        $.getJSON("http://127.0.0.1:8000/list_message").done(function(data) {
            for( var pro=0; pro<data.length; pro++) {
                if(parseInt(data[pro].fields.promotion) === parseInt($("#modal-promo-name").attr("data-id"))){
                    $("#created-message").prepend(
                        "<div class='form-group'>" +
                        "<label for='exampleInputEmail1'>"+data[pro].fields.mail+": </label>" +
                        "<div class='promo-message-tittle'>"+data[pro].fields.message+"</div>" +
                        "</div>"+
                        "<hr>"
                    );
                }
            }
        }).fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
        });

        $.getJSON("http://127.0.0.1:8000/logged_users/").done(function(data){
            if( data.message === "logged"){
                $(".email-message").show();
                $(".text-message").show();
                $("#btn-send-commit").show();
            } else {
                $(".email-message").hide();
                $(".text-message").hide();
                $("#btn-send-commit").hide();
                $(".alert-logged-messsage").show();
            }
        }).fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
        });

        //$("#loaded-promotion-modal").hide();
        $(".modal-box").modal('show');

    };

    return promotion;

});