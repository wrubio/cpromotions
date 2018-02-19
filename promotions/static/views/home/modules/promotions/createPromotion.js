define([], function () {

    'use strict';

    var promotion = [];

    promotion.create = function () {
        $.getJSON("http://127.0.0.1:8000/list_promotion").done(function (data) {
            var getData = data;
            var colorCtr = 0;
            var rowCtr = 0;
            var promotion_background, promotion_description;

            for (var i = 0; i < getData.length; i++) {

                var fields = getData[i].fields;
                switch (colorCtr) {
                    case 0:
                        promotion_background = "#B680CE";
                        promotion_description = "#765486";
                        break;
                    case 1:
                        promotion_background = "#3B9FE6";
                        promotion_description = "#195686";
                        break;
                    case 2:
                        promotion_background = "#26C4A2";
                        promotion_description = "#247663";
                        break;
                    case 3:
                        promotion_background = "#D7675A";
                        promotion_description = "#773e38";
                        break;
                    case 4:
                        promotion_background = "#A28671";
                        promotion_description = "#6b5c51";
                        break;
                    default:
                        promotion_background = "#FCCE54";
                        promotion_description = "#af8d32";
                        break;
                }

                $(".promotion-container").children().eq(rowCtr).children().eq(0).append(
                    "<div class='col-md-4' data-city='"+ getData[i].fields.ciudad +"' data-category='"+ getData[i].fields.category +"'>" +
                    "<div id='promotion" + getData[i].pk + "' class='panel panel-default panel-promotion modal-promotion' style='background-color:" + promotion_background + "';>" +
                    "<div class='panel-body' style='padding: 5px 15px;'>" +
                    "<div class='container-img-cost' style='position: relative'>" +
                    "<div class='promotion-information'>" +
                    "<h2 class='promotion-title'>" + fields.promotion_name + "</h2>" +
                    "<p class='promotion-cost'> $" + fields.cost + "</p>" +
                    "<p id='promotion-description" + getData[i].pk + "' class='promotion-description' style='color:" + promotion_description + ";'>" + fields.description + "</p>" +
                    "</div>" +
                    "<div class='show-promotion-container'><div class='show-promotion-text'>Ver promoción</div></div>" +
                    "<div class='container-image'>" +
                    "<div class='relative-container'>" +
                    "<div class='rotate-container'>" +
                    "<img src='" + fields.image + "' alt='Ejemplo de imagen' style='width: 100%;'>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                );
                colorCtr++;
                if (colorCtr === 6) {
                    $(".promotion-container").append("<div class='promotions'><div class='promotion-row row container'></div></div>");
                    rowCtr++;
                }
                if (colorCtr === 6) {
                    colorCtr = 0;
                }
                var getPromoDescription = $("#promotion-description" + getData[i].pk).text().substring(0, 56);
                $("#promotion-description" + getData[i].pk).html("").append(getPromoDescription + "...");
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
        });
    };

    return promotion;
});
