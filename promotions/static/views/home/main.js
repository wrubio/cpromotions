$(document).ready(function(){
    // ==============================================================================================
    // Categories controller
    // ==============================================================================================
    var categorias;
    var dataCategory = function(data){
        categorias=data;
        for(var ca=0; ca<categorias.length; ca++){
            $("#register-category").append(
                "<div class='col-md-4'>" +
                "<input type='checkbox' class='register-category' value='"+categorias[ca].fields.name+"'>"+categorias[ca].fields.name +
                "</div>"
            )
        }

    };
    $.getJSON("http://127.0.0.1:8000/list_category").done(function(data){
        dataCategory(data);
    });

    // ==============================================================================================
    // Add Message in promotion controller
    // ==============================================================================================
    (function($) {
        var origAppend = $.fn.append;

        $.fn.append = function () {
            return origAppend.apply(this, arguments).trigger("append");
        };
    })(jQuery);
    $("#modal-promotion").on("click", "#btn-send-commit", function(e){
        e.preventDefault();
        require(['modules/promotions/addMessage'], function(promotion){
            promotion.addMessage();
        });

    });

    // ==============================================================================================
    // Show / hide message in promotion modal controller
    // ==============================================================================================
    $("#modal-promotion").bind("append", function(){
        setTimeout(function(){
            require(['modules/promotions/showHideMessage'], function(promotion){
                promotion.showHideMessage();
            });
        }, 500);
    });

    // ==============================================================================================
    // Promotion object creator controller
    // ==============================================================================================
    require(['modules/promotions/createPromotion'], function(promotion){
        promotion.create();
    });

    // ==============================================================================================
    // Promotion Modal controller
    // ==============================================================================================
    $("#promotions").on("click", ".modal-promotion", function(e){
        e.preventDefault();
        var promotionId = $(this).attr("id");
        var splitId = promotionId.split("n");
        require(['modules/promotions/promotionDetail'], function(promotion){
            promotion.detail(categorias, splitId);
        });
    });
    $("#modal-promotion").on("click", ".close-modal", function(e){
        e.preventDefault();
        $(".modal-box").modal('hide');
    });

    // ==============================================================================================
    // Users Register controller
    // ==============================================================================================
    $("#send-register").on("click", function (e) {
        e.preventDefault();
        require(['modules/users/register'], function(users){
            users.register();
        });
    });
    $("#btn-register").on("click", function(){
        $(".modal-register").modal('show');
    });

    // ==============================================================================================
    // Login controller
    // ==============================================================================================
    $("#login-promotion").on("click", function(e){
        e.preventDefault();
        require(['modules/users/login'], function(users){
            users.login();
        });
    });

    // ==============================================================================================
    // Logout controller
    // ==============================================================================================
    $("#btn-logout").on("click", function(e){
        e.preventDefault();
        require(['modules/users/logout'], function(users){
            users.logout();
        });
    });

    // ==============================================================================================
    // Is auth controller
    // ==============================================================================================
    require(['modules/users/authenticated'], function(users){
        users.authenticated();
    });

    // ==============================================================================================
    // Slider controller
    // ==============================================================================================
    $('.header-slide').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 6000
    });

});