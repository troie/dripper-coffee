jQuery(document).ready(function ($) {

    getData();

    function getData() {
        //        localStorage.removeItem('pageId');
        //        localStorage.removeItem('title');
        var url = "/js/bean.json";

        $.getJSON(url, function (data) {
            var bean_data = [];
            var page = imgCss = imageUrl = "";
            $.each(data, function (key, val) {
                page += "<div class=\"card-square mdl-card mdl-shadow--2dp\">" +
                    "<div class=\"mdl-card__title mdl-card--expand card card_" + key + "\"><h2 class=\"mdl-card__title-text\">" + data[key].title_cn + "</h2></div>" +
                    "<div class=\"mdl-card__supporting-text\">" + data[key].flavor_cn + "</div>" +
                    "<div class=\"mdl-card__actions mdl-card--border\">" +
                    "<strong>&yen;20</strong>" +
                    "<button class=\"mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored buy-it\"><i class=\"material-icons\">local_cafe</i></button>" +
                    "</div>" +
                    "</div>";
            });
            //            console.log(page)
            $(page).appendTo(".page-content");
            addBackground(data);
        });
    }

    function addBackground(data) {
        var imageUrl = "";
        $.each(data, function (key, val) {
                        imageUrl = "../img/" + data[key].image;
            $(".card_" + key).css('background-image', 'url(' + imageUrl + ')');
        });
    }


    function getPage(pageId) {
        $(".menu").html("");
        if (!localStorage.getItem('pageId')) localStorage.setItem('pageId', pageId);
        else pageId = localStorage.getItem('pageId');

        var url = "/js/main-page.json";
        $.getJSON(url, function (data) {
            localStorage.setItem('title', data[pageId].title_en);
            var page = "<div class=\"page_up\" id=\"intro_page\">" +
                "<h1>" + data[pageId].title_en + "</h1>" +
                "<ascid><i>" + data[pageId].score + "</i>IMDb</ascid>" +
                "<dl>" +
                "<dt>Director</dt><dd>" + data[pageId].director + "</dd>" +
                "<dt>Country</dt><dd>" + data[pageId].country + "</dd>" +
                "<dt>Type</dt><dd>" + data[pageId].type + "</dd>" +
                "<dt>Runtime</dt><dd>" + data[pageId].runtime + "</dd>" +
                "<dt>Year</dt><dd>" + data[pageId].year + "</dd>" +
                "</dl>" +
                //                "<img src='http://lorempixel.com/270/360/food/" + pageId + "'>" +
                "<img src='img/doc_" + data[pageId].doc_vol + ".jpg'>" +
                "<p>" + data[pageId].description + "</p>" +
                "</div>";
            $(page).appendTo(".page");
            getSliderData(pageId);
            //            $("<img class=\"background\" src=\"http://lorempixel.com/270/360/food/" + pageId + "\">").appendTo(".page");
            $("<img class=\"background\" src=\"img/doc_" + data[pageId].doc_vol + ".jpg\">").appendTo(".page");
        });
        //        console.log("pageId"+localStorage.getItem('pageId'));
    }

    function getSliderData(pageId) {
        var url = "/js/comment/comment_" + pageId + ".json";
        var sliderData;
        $.getJSON(url, function (data) {
            sliderData = data;
            makeSlider(data)
        });
    }

    function makeSlider(sliderData) {
        var slider, page, comment;
        var items = [];
        $.each(sliderData, function (key, val) {
            comment = val.comment.split("\n");
            items.push("<li id=\"" + "comment_" + key + "\" data-index=\"" + key + "\"><b>" + val.commentator + "</b><p>" + comment[0] + "</P</li>");
        });
        slider = "<div class=\"slider\"><ul>" + items.join("") + "</ul></div>";
        page = "<div class=\"page_down\" id=\"comment_page\">" + slider + "</div>";
        $(page).insertAfter(".page_up");

        $('.slider').unslider({
            autoplay: true,
            arrows: false
            //                infinite: true
        });
    }

    function getComment(commId) {
        $(".page").html("");

        var pageId = localStorage.getItem('pageId');
        var url = "/js/comment/comment_" + pageId + ".json";
        var sliderData;
        $.getJSON(url, function (data) {
            var content = "<header>" +
                "<h1>" + commId + " " + localStorage.getItem('title') + "</h1>" +
                "</header>" +
                "<div  id=\"comment_detail_page\">" +
                "<b>" + data[commId].commentator + "</b>" + makeComment(data[commId].comment) + "</div>" +
                "<footer></footer>" +
                "<img class=\"background\" src=\"http://lorempixel.com/270/360/food/" + pageId + "\">";

            $(content).appendTo(".comment");
        });
    }

    function makeComment(str) {
        //        var inputValue = document.getElementById("txtArea").value;

        var content = (str).split("\n");
        var items = [];
        $.each(content, function (key, val) {

            //            console.log(comment)
            items.push("<p>" + val + "</p>");
        });
        return items.join("");
    }


});
