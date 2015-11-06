//scroll
var myScroll;
window.onload = function loaded () {
    myScroll = new IScroll('#wrapper', { mouseWheel: true, click: true });
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//javascript:anchor('a')
function anchor(pos){
    myScroll.scrollToElement(document.querySelector('#'+pos))
};

//分类swiper
var titSwiper;
var conSwiper;
function goLocation(i){
    conSwiper.slideTo(i, 300, function(){});
    setClass(i);
}
var titSwiper = new Swiper('.swiper-title', {
    slidesPerView: 2.8
});

var conSwiper = new Swiper('.swiper-container', {
    pagination : '.pagination',
    preloadImages: false,
    lazyLoading: true
});

conSwiper.params.onSlideChangeEnd = function(){
    var index = conSwiper.activeIndex;
    var prevIndex = conSwiper.previousIndex;
    if (index > prevIndex){
        titSwiper.slideTo(index, 300, function() {});
        setClass(index);
    }else{
        titSwiper.slideTo(index, 300, function() {});
        setClass(index);
    };
};

$(".swiper-title").find('.swiper-slide').each(function(index, el) {
    var date = new Date();
    var getDay = date.getDate();
    var myDay = $(this).attr('data-day');
    if(myDay < getDay){         //设定日期小于当前日期 则删除已过期的活动
        var index = $(this).index();
        $(this).remove();
        $(".sm-tab-con").children().children('.swiper-slide').eq(index).remove();
    }else if(myDay > getDay){       //设定日期小于当前日期 则给活动置灰并取消超链接
        var index = $(this).index();
        $(".sm-tab-con").children().children('.swiper-slide').eq(index).addClass('gray').find('a').removeAttr('href');
    }else{      //设定日期等于当前日期 则显示当前活动
        var index = $(this).index();
        $(this).addClass('active').children('i').remove();
        $(".sm-tab-con").children().eq(index).show();
    }
    titSwiper.update();
    conSwiper.update();
    $(el).on('click', function(){
        goLocation(index);
    });
});

function setClass(i) {
    $(".swiper-title").find('.swiper-slide').each(function(index, el) {
        if (index != i) {
            if ($(el).hasClass("active")) {
                $(el).removeClass("active");
            }
        } else {
            $(el).addClass("active");
        }
    });
};
