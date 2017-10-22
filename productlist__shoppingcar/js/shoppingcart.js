/**拿到登录用户名**/
var tempName = sessionStorage.getItem('tempName');
//alert(tempName);


/*加载页头页尾*/
$(function(){
    var s=screen.availWidth;
    console.log(s);
    $('body').css('width',s);//设置body宽度

	//加载页头的同时,修改#welcome的html为用户名
	$("div#header").load('data/header.php',function(){
		$('#bt-login').html('你好,'+tempName);
		$('#register').html('');

	});
	$("div#footer").load('data/footer.php');
})



//页面加载时,异步获取购物车中的商品数据
$(function(){
	$.ajax({
		url:'data/cart_detail.php',
		data:{uname:tempName},
		success:function(cartlist){
			var html='';
			$.each(cartlist,function(i,d){
				html+=`
				<tr class='${d.did}'>
                    <td>
                        <input type="checkbox"/>
                        <input type="hidden" value="1" />
                        <div><img src="${d.pic}" alt=""/></div>
                    </td>
                    <td><a href="">${d.pname}</a></td>
                    <td>${d.price}</td>
                    <td>
                        <button class="delNum">-</button><input type="text" value="${d.count}"/><button class="addNum">+</button>
                    </td>
                    <td><span>${d.price*d.count}</span></td>
                    <td><a href="" >删除</a></td>
                </tr>	
				`
			})
			$("#cart tbody").html(html);

            /*将各条小计相加得总计*/
            var n=0;
            var total=0;
            var n=$('#cart tbody tr').size(); //获取该页面中有多少个tr元素
            sessionStorage.setItem('shopping_count',n);//将购物的数量存到storage,以传到购物车显示数量
            for(var i=1;i<=n;i++){
                var str=$('#cart tbody tr:nth-child('+i+') td:nth-child(5)').text();
                total=total+parseFloat(str);
                console.log(total);
            }
            $('#cart_footer div span').html(total);
			
		}
	})
})

/**单击+和-修改购物数量**/
$('#cart').on('click','button',function(){
  //客户端修改
  var self = this;
  var operation = $(this).html();
  var count = parseInt($(this).siblings('input').val());
  if(operation=='-' && count>1){
    count--;
  }
  if(operation=='+'){
    count++;
  }
  
  //服务器端修改
  //var did = $(this).parent().parent().find('input[name="did"]').val();
  var did=$(this).parent().parent().attr('class');
    var price=$(this).parent().prev().html();

  console.log(did,count,price);
  $.ajax({
    url: 'data/cart_update.php',
	data:{did:did,count:count},
	
    success: function(txt){
      if(txt=='succ'){
        console.log('修改成功');
        $(self).siblings('input').val(count);
          $(self).parent().next().children(0).html(count*price);//修改小计

          /*将各条小计相加得总计*/
          var n=0;
          var total=0;
          var n=$('#cart tbody tr').size(); //获取该页面中有多少个tr元素
          for(var i=1;i<=n;i++){
              var str=$('#cart tbody tr:nth-child('+i+') td:nth-child(5)').text();
              total=total+parseFloat(str);
              console.log(total);
          }
          $('#cart_footer div span').html(total);

      }else{ 
        console.log('修改失败');
      }
    }
  });
  
});


/**单击"删除"超链接删除该商品**/
$('#cart').on('click','a:contains("删除")',function(e){
  e.preventDefault();
  //服务器端修改
  var did=$(this).parent().parent().attr('class');
  var self = this;
  console.log(did);
  $.ajax({
    url: 'data/cart_detail_delete.php',
    data: {did: did},
    success: function(txt){
      if(txt=='succ'){
        console.log('删除成功');
        //客户端TR元素的删除
        $(self).parent().parent().remove();

          /*将各条小计相加得总计*/
          var n=0;
          var total=0;
          var n=$('#cart tbody tr').size(); //获取该页面中有多少个tr元素
          for(var i=1;i<=n;i++){
              var str=$('#cart tbody tr:nth-child('+i+') td:nth-child(5)').text();
              total=total+parseFloat(str);
              console.log(total);
          }
          $('#cart_footer div span').html(total);

      }else{ 
        alert('删除失败');
      }
    }
  });
  
});
