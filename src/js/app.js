import 'bootstrap'

$(document).ready(function (){
        $('.p-share button').click(function(){
            $('.share-wrapper').toggle(1000, function () {
                if ($(this).is(":visible") == true) {
                    $(this).css('display', 'flex');
                }
                else {
                    $(this).css('display', 'none');
                }
            });
        });
        $('.next-button, .previous-button').click(function () {
            if ($('#p-blog1').is(":visible") == true) {
                $('#p-blog1').hide();
                $('#p-blog2').show();
            }
            else {
                $('#p-blog1').show();
                $('#p-blog2').hide();

            }
        });
        $('.show-all').click(function () {
            if ($('#p-blog1').is(":visible") == true) {
                $('#p-blog1').show();
                $('#p-blog2').show();
            }
        });
        $('.searchIcon i').click(function(){
            $('.searchInput').toggle(1000, function () {
                if ($(this).is(":visible") == true) {
                    $(this).css('display', 'flex');
                }
                else {
                    $(this).css('display', 'none');
                }
            });
        });
        $('.dropdown-menu1 i').click(function(){
            $('.menu').toggle(1000, function () {
                if ($(this).is(":visible") == true) {
                    $(this).css('display', 'flex');
                }
                else {
                    $(this).css('display', 'none');
                }
            });
        });

    }
);
