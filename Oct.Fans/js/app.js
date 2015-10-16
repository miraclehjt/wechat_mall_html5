$(function () {
    setmySwiperHeight()
});
var mySwiper1;
var mySwiper;

function goLocation(i) {
    mySwiper.swipeTo(i, 300, function () {});
    setClass(i);
}
$(document).ready(function () {
    mySwiper = new Swiper('.swiper-container', {
        pagination: '.pagination',
        paginationClickable: true
    });
    mySwiper1 = new Swiper('.swiper-ticket', {
        pagination: '.pagination',
        paginationClickable: true,
        slidesPerView: 4.5
    });

    var slidewidth = $('.swiper-ticket .title').width();
    $(".bar").offset({
        left: 0
    }).css('width', slidewidth);

    mySwiper.params.onSlideNext = function () {
        var index = mySwiper.activeIndex;
        mySwiper1.swipeTo(index, 300, function () {});
        var slidleft = $("#slide" + index).offset().left;
        $(".bar").offset({
            left: slidleft
        }).css('width', slidewidth);
        setClass(index);
        // alert(slidleft);
    }
    mySwiper.params.onSlidePrev = function () {
        var index = mySwiper.activeIndex;
        mySwiper1.swipeTo(index, 300, function () {});
        var slidleft = $("#slide" + index).offset().left;
        $(".bar").offset({
            left: slidleft
        }).css('width', slidewidth);
        setClass(index);
    }
    $("div[name='title']").each(function (index, el) {
        $(el).click(function () {
            goLocation(index);
            var slidleft = $("#slide" + index).offset().left;
            $(".bar").offset({
                left: slidleft
            }).css('width', slidewidth);
        });
    });
});

/*--------------------socroll---------------------------------------------------*/
var myScroll0;
var myScroll1;
var myScroll2;
var myScroll3;
var myScroll4;
var myScroll5;
var myScroll6;
var myScroll7;
var myScroll8;
var myScroll9;
window.onload = function loaded() {
    myScroll0 = new IScroll('#wapper0', {
        mouseWheel: false
    });
    myScroll1 = new IScroll('#wapper1', {
        mouseWheel: false
    });
    myScroll2 = new IScroll('#wapper2', {
        mouseWheel: false
    });
    myScroll3 = new IScroll('#wapper3', {
        mouseWheel: false
    });
    myScroll4 = new IScroll('#wapper4', {
        mouseWheel: false
    });
    myScroll5 = new IScroll('#wapper5', {
        mouseWheel: false
    });
    myScroll6 = new IScroll('#wapper6', {
        mouseWheel: false
    });
    myScroll7 = new IScroll('#wapper7', {
        mouseWheel: false
    });
    myScroll8 = new IScroll('#wapper8', {
        mouseWheel: false
    });
    myScroll9 = new IScroll('#wapper9', {
        mouseWheel: false
    });
}
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
/*--------------------socroll-----------------------------------------------------*/

function goto(url) {
    window.location.href = url;
}

function setClass(i) {
    $("div[name='title']").each(function (index, el) {
        if (index != i) {
            if ($(el).hasClass("current")) {
                $(el).removeClass("current");
            }
        } else {
            $(el).addClass("current");
        }
    });
}

function setmySwiperHeight() {
    var _t = $('.topfigure').height() + 38;
    var _h = document.documentElement.clientHeight; //获取页面可见高度
    var swiperHeight = _h - _t;
    $('.ticket-container').height(swiperHeight);
}

//当浏览器窗口大小改变时，设置显示内容的高度
window.onresize = function () {
    setmySwiperHeight();
}