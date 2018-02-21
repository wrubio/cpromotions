define([], function(){

    'use strict';

    var slider = [];

    slider.create = function () {

        $.getJSON("https://cpromotion.herokuapp.com/list_promotion").done(function (data) {

            var promotions = data;
            for(var prm = 0; prm< promotions.length; prm++){
                if(prm < 3){
                    $("#header-slick").append(
                        "<div class='slide-container' style='display: none;'>"+
                        "<div class='slide-img'>" +
                        "<img src='"+ promotions[prm].fields.image +"' alt'Images slider show'/>" +
                        "</div>" +
                        "<div class='slide-title'>"+ promotions[prm].fields.promotion_name +"</div>" +
                        "<div class='slide-cost'> $"+ promotions[prm].fields.cost +" COP</div>" +
                        "<div class='slide-description'>"+ promotions[prm].fields.description +"</div>" +
                        "<div class='slide-city'> Ciudad: "+ promotions[prm].fields.city +"</div>" +
                        "<div class='slide-end-date'>"+ promotions[prm].fields.end_date +"</div>" +
                        "<div class='slide-btn'>" +
                        "<button id='promotion"+promotions[prm].pk+"' type='button' class='btn btn-primary modal-promotion'>Ver promoción</button>" +
                        "</div>" +
                        "</div>"
                    )
                }
                if(prm === 3 ) {
                    $('#header-slick').slick({
                        dots: true,
                        arrows: false,
                        infinite: true,
                        speed: 500,
                        fade: true,
                        cssEase: 'linear',
                        autoplay: true,
                        autoplaySpeed: 6000
                    });
                    $(".slide-container").css("display", "block");
                    prm=promotions.length;
                }
            }
        });


    };

    return slider;

});