;(function(){
	//编辑
	$('.cartEdit').click(function() {
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
				obj.parent().parent().removeClass('checked');
			}
		}else{
			for(var i=0; i<obj.length; i++){
				obj[i].checked = true;
				obj.parent().parent().addClass('checked');
			}
		}
		setTotal();
	});

	$('.setSelectAll').on('change', 'input', function() {
		var $this = $(this).closest('.cart-list');
		var obj = $this.find('.setSelectAll');
		var count = obj.length;
		var selectCount = 0;
		var value = this.checked;
		for(var i = 0; i < count; i++) {
			if(obj[i].checked == true){
				selectCount++;
			}
		}
		if(value == false) {
			$(this).parent().parent().removeClass('checked');
		}else{
			$(this).parent().parent().addClass('checked');
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
		setTotal();
	});

	//调整购买数量
	$(".increase").click(function() {
		var n = $(this).parent().find('.num');
		n.val(parseInt(n.val()) + 1)
		setTotal();
		//ajax代码可以放这里传递到数据库实时改变总价
	});
	$(".decrease").click(function() {
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

	// 计算价格和数量
	function setTotal() {
		$(".cart-main").find('.cart-list').each(function() {
			var quantity = 0;	//总数量
			var total = 0;		//总价格
			var len = $(this).find('.checked').length;
			if(len <= 1){
				$(this).closest('.cart-list').find(".total b").html('￥0.00');
				$(this).closest('.cart-list').find(".quantity b").html(0);
			}
			$(this).find('.cart-box .checked').each(function(i){
				var number = $(this).find('.num').val();		//数量
				var price = $(this).find('.price .n').text();	//单价
				total += parseInt(number) * parseFloat(price);
				quantity += parseInt(number);

				// alert('总价：' + total + '　总数：' + quantity + '　单价：' + price + '数量：' + number);
					$(this).closest('.cart-list').find(".total b").html('￥' + total.toFixed(2));
					$(this).closest('.cart-list').find(".quantity b").html(quantity);
			});
		});
	}
})();

