define([], function(){

    'use strict';

    var promotion = [];

    promotion.detail = function (categorias, splitId) {
        //$("#loaded-promotion-modal").show();

        $.getJSON("http://127.0.0.1:8000/list_promotion").done(function(data){
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
                    $("#modal-promotion").html("").append(
                        "<div class='modal fade modal-box' data-backdrop='static' data-keyboard='false' tabindex='-1' role='dialog'>" +
                        "<div class='modal-dialog modal-lg' role='document'>" +
                        "<div class='modal-content'>" +
                        "<div class='modal-header'>" +
                        "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                        "<h4 id='modal-promo-name' class='modal-title' data-id='"+ promotionData[i].pk +"'>"+ promotionData[i].fields.promotion_name+"</h4>" +
                        "</div>" +
                        "<div class='modal-body'>" +

                        "<div class='panel panel-default'>" +
                        "<div class='panel-body'> " +
                        "<div class='row'>" +
                        "<div class='col-md-6'>" +
                        "<div class='img-modal-promotion'>"+
                        "<img src='"+ promotionData[i].fields.image +"' alt='Smiley face' height='42' width='42'>" +
                        "</div>"+
                        "</div>" +
                        "<div class='col-md-6'>" +
                        "<div class='panel panel-default' style='background-color: #efefef;'>" +
                        "<div class='panel-body'> " +
                        "<div class='promo-detail'><h4>Detalle de la promoción</h4></div>" +
                        "<hr style='margin: 5px 0; border-top: 1px solid #c3c3c3;'>" +
                        "<div class='promo-cost row'><div class='col-md-4'><b>Valor:</b></div><div class='col-md-8'>"+ promotionData[i].fields.cost + "</div></div>" +
                        "<div class='promo-city row'><div class='col-md-4'><b>ciudad:</b></div><div class='col-md-8'>"+ promotionData[i].fields.city + "</div></div>" +
                        "<div class='promo-cost row'><div class='col-md-4'><b>Finaliza:</b></div><div class='col-md-8'>"+ promotionData[i].fields.end_date + "</div></div>" +
                        "<hr style='margin: 5px 0; border-top: 1px solid #c3c3c3;'>" +
                        "<div class='promo-description'><b>Descripción:</b>" +
                        "<div class='text-promo-description'>" +
                        promotionData[i].fields.description +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +

                        "</div>" +
                        "<hr>" +
                        "<div class='row' style='background-color: #efefef; margin: 0;'>"+
                        "<div class='col-md-3'> "+
                        "<div class='promo-category'><b>Categoría:</b> "+categoryName+"</div>" +
                        "</div>" +
                        "<div class='col-md-1' style='width:24px'> | </div>"+
                        "<div class='col-md-1'>"+
                        "<a href+'#' class='promo-favoritos'><i class='fas fa-thumbs-up'></i> like</a>" +
                        "</div>" +
                        "<div class='col-md-1' style='width:24px'> | </div>"+
                        "<div class='col-md-6'>"+
                        "</div>" +
                        "</div>" +
                        "<hr>" +
                        "<div class='promo-message-tittle'><h4>Agrega un comentario:</h4></div>" +
                        "<div class='panel panel-default' style='background-color: #efefef;'>" +
                        "<div class='panel-body'>" +
                        "<div class='alert alert-danger alert-logged-messsage' role='alert'><b>Hola!</b> Ingresa al sistema para poder agregar un mensaje.</div>" +
                        "<form>" +
                        "<div class='email-message'>"+
                        "<div class='input-group'>" +
                        "<span class='input-group-addon' id='basic-addon1'><i class='fas fa-envelope'></i> Email</span>" +
                        "<input id='email-message' type='email' class='form-control' placeholder='Email' aria-describedby='basic-addon1'>" +
                        "</div>" +
                        "</div>" +
                        "<div class='text-message'>"+
                        "<textarea id='text-message' class='form-control' rows='3'></textarea>" +
                        "</div>" +
                        "<div class='div-send-commit'>"+
                        "<button id='btn-send-commit' type='submit' class='btn btn-primary'>Comentar!</button>" +
                        "</div>" +
                        "</form>" +
                        "<hr style='border-top: 1px solid #c3c3c3;'>" +
                        "<div class='promo-message-added'><h5>Mensajes agregados:</h5></div>" +
                        "<div class='panel panel-default'>" +
                        "<div id='created-message' class='panel-body'></div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +

                        "</div>" +
                        "<div class='modal-footer'>" +
                        "<button type='button' class='btn btn-default close-modal' data-dismiss='modal'>Close</button>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>"
                    );
                }
            }



        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
        });


    };

    return promotion;
});