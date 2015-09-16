//编辑
$('.cartEdit').on('tap', function() {
	if(!$(this).hasClass('active')){
		$(this).addClass('active').text('确定').parents('.cart-list').addClass('editOrder');
		$('.cart-box a').click(function() {
			event.preventDefault();
		});
	}else{
		$(this).removeClass('active').text('编辑').parents('.cart-list').removeClass('editOrder');
		$('.cart-box a').unbind('click');
	}
});

//全选
$('.selectAll').on('change', 'input', function() {
	var $this = $(this).closest('.cart-list');
	var obj = $this.find('.setSelectAll');
	var value = this.checked;
	if(value == false) {
		for(var i=0; i<obj.length; i++) {
			obj[i].checked = false;
		}
	}else{
		for(var i=0; i<obj.length; i++){
			obj[i].checked = true;
		}
	}
	setTotal();
});

$('.setSelectAll').on('change', 'input', function() {
	var $this = $(this).closest('.cart-list');
	var obj = $this.find('.setSelectAll');
	var count = obj.length;
	var selectCount = 0;
	for(var i = 0; i < count; i++) {
		if(obj[i].checked == true){
			selectCount++;
		}
	}
	if(count == selectCount) {
		$this.find('.selectAll').prop('checked',true);
	}else{
		$this.find('.selectAll').prop('checked',false);
	}
	setTotal();
});

//删除
$('.icon-del').on('tap', function() {
	var a = $(this).closest(".cart-list");
	var len = a.find('.cart-box .cart-group').length;
	if( len <= 1){
		$(this).closest(".cart-list").remove();
	}else{
		$(this).closest(".cart-group").remove();
	}
	var cartList = $('.cart-list').length;
	if(cartList == 0){
		$('.cart-main').css('display','block');
		$('.empty').css('display','block');
	}
	setTotal();
});

//调整购买数量
$(".increase").on('tap', function() {
	var n = $(this).parent().find('.num');
	n.val(parseInt(n.val()) + 1)
	setTotal();
	//ajax代码可以放这里传递到数据库实时改变总价
});
$(".decrease").on('tap', function() {
	var n = $(this).parent().find('.num');
	n.val(parseInt(n.val()) - 1)
	if (parseInt(n.val()) < 0) {
		n.val(0);
	}
	setTotal();
});
$('.num').blur(function(){
	setTotal();
});
//计算价格和数量
function setTotal() {
	$(".cart-main").find('.cart-list').each(function() {
		var t = 0;
		var s = 0;
		$(this).find('.cart-box .cart-group').each(function(){
			var n = $(this).find('.num').val();
			var p = $(this).find('.price .n').text();
			t += parseInt(n) * parseFloat(p);
			s += parseInt(n);
			// alert('n:' + n + '　p:' + p + '　t:' + t + '　s:' + s);
			$(this).closest('.cart-list').find(".total b").html('￥' + t.toFixed(2));
			$(this).closest('.cart-list').find(".quantity b").html(s);
		});
	});
}
setTotal();
