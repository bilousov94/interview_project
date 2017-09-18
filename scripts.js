$(function() {

    var App = {

        init: function(){

            App.showData();
            App.bindEvents();
        },

        showData: function(){
            var baseURL = "https://jsonplaceholder.typicode.com";

            var numberOfUsers = 2;

            for(var j = 1; j <= numberOfUsers; j++){

                $.ajax({
                    url: baseURL + '/users/' +j+ '/albums',
                    method: 'GET'

                }).then(function(data){

                    for(var i = 0; i<data.length; i++ ){
                        var row = "<div id='"+data[i].id + "' class='table__row'>" +
                            "<div class='table__cell table__cell--short'>" + data[i].id + "</div>" +
                            "<div class='table__cell table__cell'>" + data[i].title + "</div>" +
                            "   </div>";
                        var userId = "#user_" + data[i].userId;
                        $(userId).append(row);
                    }
                });

            }
        },

        bindEvents: function() {

            $('.search_user_1').keyup(function () {
                var str = $('.search_user_1 input').val();
                var exp = new RegExp(str, 'i');
                var el = $('#user_1').children().length;

                for(var i = 2; i <= el; i++){
                    var text = $('#user_1 div:nth-child(' + i + ') div:nth-child(2)').text();
                    if(text.match(exp)){
                        $('#user_1 div:nth-child(' + i + ')').css("display", "");
                        $('#user_1 div:nth-child(' + i + ') div:nth-child(2)').css("display", "");
                    } else {
                        $('#user_1 div:nth-child(' + i + ')').css("display", "none");
                    }
                }
            });

            $('.search_user_2').keyup(function () {
                var str = $('.search_user_2 input').val();
                var exp = new RegExp(str, 'i');
                var el = $('#user_2').children().length;

                for(var i = 2; i <= el; i++){
                    var text = $('#user_2 div:nth-child(' + i + ') div:nth-child(2)').text();
                    if(text.match(exp)){
                        $('#user_2 div:nth-child(' + i + ')').css("display", "");
                        $('#user_2 div:nth-child(' + i + ') div:nth-child(2)').css("display", "");
                    } else {
                        $('#user_2 div:nth-child(' + i + ')').css("display", "none");
                    }
                }
            });

        }
    };

    App.init();

});
