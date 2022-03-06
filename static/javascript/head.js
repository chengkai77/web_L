if($('.has-msg').hasClass('hide')){
    $('.has-msg').fadeIn('slow', function(e){
        $('.has-msg').removeClass('hide');
    });
}else {
    $('.has-msg').fadeOut('slow', function (e) {
        $('.has-msg').addClass('hide');
    });
}
$('.header-li').hover(function(e){
    var target = e.target;
    var ul = $(target).children('.header-item-children');
    $('.header-li .header-item-children').hide();
    if(ul.length > 0){
        $(ul[0]).show();
    }
},
function(e){
    var target = e.target;
    var ul = $(target).children('.header-item-children');
    if(ul.length > 0){
        $(ul[0]).hide();
    }
});
$('.header-item-children').hover(function(e){},function(e){
    $('.header-item-children').hide();
});
$('.header-user-ctt').hover(function(){
    $('.header-userlist-ctt').show();
},function(){
    $('.header-userlist-ctt').hide();
});