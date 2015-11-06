//分类swiper
var titSwiper;
var conSwiper;
function goLocation(i){
    conSwiper.slideTo(i, 300, function(){});
    setClass(i);
}
var titSwiper = new Swiper('.swiper-title', {
    slidesPerView: 4
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
        var slidleft = $("#slide" + index).offset().left;
        var slidwidth = $("#slide" + index).width();
        setClass(index);
    }else{
        titSwiper.slideTo(index, 300, function() {});
        setClass(index);
    };
};
$(".swiper-title").find('.swiper-slide').each(function(index, el) {
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
//倒计时
function lxfEndtime(){
    $(".cutdown").each(function(){
        var lxfday=$(this).attr("lxfday");//用来判断是否显示天数的变量
        var endtime = new Date($(this).attr("endtime")).getTime();//取结束日期(毫秒值)
        var nowtime = new Date().getTime();        //今天的日期(毫秒值)
        var youtime = endtime-nowtime;//还有多久(毫秒值)
        var seconds = youtime/1000;
        var minutes = Math.floor(seconds/60);
        var hours = Math.floor(minutes/60);
        var days = Math.floor(hours/24);
        var CDay= days ;
        var CHour= hours % 24;
        var CMinute= minutes % 60;
        var CSecond= Math.floor(seconds%60);//"%"是取余运算，可以理解为60进一后取余数，然后只要余数。
        if(endtime<=nowtime){
            $(this).html("本次活动已过期！")//如果结束日期小于当前日期就提示过期啦
        }else{
            if($(this).attr("lxfday")=="no"){
                $(this).html("<span>"+CHour+"</span>时<span>"+CMinute+"</span>分<span>"+CSecond+"</span>秒");//输出没有天数的数据
            }else{
                $(this).html("<span>"+days+"</span><em>天</em><span>"+CHour+"</span><em>时</em><span>"+CMinute+"</span><em>分</em><span>"+CSecond+"</span><em>秒</em>");//输出有天数的数据
            }
        }
    });
    setTimeout("lxfEndtime()",1000);
};

