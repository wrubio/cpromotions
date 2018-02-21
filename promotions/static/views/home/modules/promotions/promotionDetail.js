define([], function(){

    'use strict';

    var promotion = [];

    promotion.detail = function (categorias, splitId) {
        $.getJSON("https://cpromotion.herokuapp.com/list_promotion").done(function(data){
            var promotionData = data;
            // ======================================================================================
            // Recorre el json para buscar cual es la promocion a consultar
            for(var i=0; i<promotionData.length; i++){
                var getId = promotionData[i].pk;
                var categoryName;
                for(var c=0; c<categorias.length;c++){
                    if(promotionData[i].fields.category === categorias[c].pk){
                        categoryName = categorias[c].fields.name;
                    }
                }
                if( parseInt(getId) === parseInt(splitId[1])){
                    // ==============================================================================
                    // Imprimime la promocion selecionada con sus propiedades
                    $("#modal-promo-name").attr("data-id", promotionData[i].pk ).html("").append(promotionData[i].fields.promotion_name);
                    $(".img-modal-promotion img").attr("src", promotionData[i].fields.image);
                    $(".modal-field-cost").html("").append(promotionData[i].fields.cost);
                    $(".modal-field-city").html("").append(promotionData[i].fields.city);
                    $(".modal-field-end-date").html("").append(promotionData[i].fields.end_date);
                    $(".text-promo-description").html("").append(promotionData[i].fields.description);
                    $(".promo-category").html("").append("<b>Categoría:</b> "+categoryName);
                }
            }

            $(".modal-box").modal('show');

            // ==============================================================================================
            // Show / hide message in promotion modal controller
            // ==============================================================================================
            require(['modules/promotions/showHideMessage'], function (promotion) {
                promotion.showHideMessage();
            });

        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
        });
    };

    return promotion;
});