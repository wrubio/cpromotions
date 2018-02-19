define([], function () {

    'use strict';

    var promotion = [];

    promotion.filter = function () {

        var promoContainer = $('.promotion-container');

        for(var li = 0; li<promoContainer.children().length; li++){
            if(li === 0) {
                $("<li class='arrow-number-"+ (li+1) +"'><a class='arrow-number active' href='#'>"+ (li+1) +"</a></li>").insertAfter('.arrow-left');
            } else {
                $("<li class='arrow-number-"+ (li+1) +"'><a class='arrow-number' href='#'>"+ (li+1) +"</a></li>").insertAfter(".arrow-number-"+ li);
            }
        }
    };

    promotion.dropdown = function () {

        $.getJSON("https://cpromotion.herokuapp.com/list_cities").done(function (data) {
            for(var cts=0; cts<data.length; cts++){
                var cityName = data[cts].fields.name;
                $(".dropdown-cities").append("<li><a class='city-dd' data-city='"+ data[cts].pk +"' href='#'>"+ cityName +"</a></li>");
            }
            $(".dropdown-cities").prepend("<li><a class='city-dd' href='#'>Todas</a></li><li role='separator' class='divider'></li>");
        });

        $.getJSON("https://cpromotion.herokuapp.com/list_category").done(function (data) {
            for(var ct=0; ct<data.length; ct++){
                var categorytyName = data[ct].fields.name;
                $(".dropdown-category").append("<li><a class='category-dd' data-category='"+ data[ct].pk +"' href='#'>"+ categorytyName +"</a></li>");
            }
            $(".dropdown-category").prepend("<li><a class='category-dd' href='#'>Todas</a></li><li role='separator' class='divider'></li>");
        });

    };

    promotion.setValue = function (aName, filter) {

        if(filter === "cities") {
            $(".input-cities").val(aName);
        } else  {
            $(".input-category").val(aName);
        }


        setTimeout(function(){

            var citiesInput = $(".input-cities").val();
            var categoryInput = $(".input-category").val();

            var ulCities = $(".dropdown-cities"),
                ulCategory = $(".dropdown-category");

            var dataCategory = "",
                dataCities = "";

            var ctrAlert = 0;

            for( var dtCty=0; dtCty<ulCities.children().length; dtCty++){
                var getLiCities = ulCities.children().eq(dtCty);
                var getACities = getLiCities.children().eq(0);
                var getLiAttrCities = getACities.html();
                if(getLiAttrCities === citiesInput) {
                    dataCities = getACities.attr("data-city");
                }
            }

            for( var dtCtr=0; dtCtr<ulCategory.children().length; dtCtr++){
                var getLiCategory = ulCategory.children().eq(dtCtr);
                var getACategory = getLiCategory.children().eq(0);
                var getLiAttrCategory = getACategory.html();
                if(getLiAttrCategory === categoryInput) {
                    dataCategory = getACategory.attr("data-category");
                }
            }

            $(".promotion-container").html("");
            $(".promotion-container").append("<div class='promotions'><div class='promotion-row row container'></div></div>");

            $.getJSON("https://cpromotion.herokuapp.com/list_promotion").done(function (data) {
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

                    var create_promotion_filter = function () {
                        ctrAlert = 1;
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
                    };

                    if(citiesInput !== "" && categoryInput === ""){
                        if(parseInt(dataCities) === parseInt(getData[i].fields.ciudad)){
                            create_promotion_filter();
                        }
                    }

                    if(citiesInput !== "" && categoryInput === "Todas"){
                        if(parseInt(dataCities) === parseInt(getData[i].fields.ciudad)){
                            create_promotion_filter();
                        }
                    }

                    if(categoryInput !== "" && citiesInput === ""){
                        if(parseInt(dataCategory) === parseInt(getData[i].fields.category)){
                            create_promotion_filter();
                        }
                    }

                    if(categoryInput !== "" && citiesInput === "Todas"){
                        if(parseInt(dataCategory) === parseInt(getData[i].fields.category)){
                            create_promotion_filter();
                        }
                    }

                    if(citiesInput !== "" && categoryInput !== ""){
                        if(parseInt(dataCities) === parseInt(getData[i].fields.ciudad) && parseInt(dataCategory) === parseInt(getData[i].fields.category)){
                            create_promotion_filter();
                        }
                    }

                    if(citiesInput === "Todas" || categoryInput === "Todas"){
                        create_promotion_filter();
                    }

                }
                if(ctrAlert === 0){
                    $(".promotions").append("<div class='alert alert-danger' role='alert'><b>Ups!</b> Parece que en esta ciudad no hay promociones T.T</div>");
                }
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
            });

            setTimeout(function () {
                $("ul.pagination ").html("").append(
                    "<li class='li-arrow arrow-left'><a class='arrow-number' href='#' aria-label='Previous'><span aria-hidden='true'>«</span></a> </li>" +
                    "<li class='li-arrow arrow-right'><a class='arrow-number' href='#' aria-label='Next'><span aria-hidden='true'>»</span></a></li>"
                );
                require(['modules/filter/filter'], function (promotion) {
                    promotion.filter();
                });
            }, 500);

        },200);
    };

    return promotion;

})