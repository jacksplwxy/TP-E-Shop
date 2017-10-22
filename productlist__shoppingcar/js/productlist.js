//加载页头和页尾并且导入sessionStorage的存储值
var tempName=null;
$(function(){
    var s=screen.availWidth;
    console.log(s);
    $('body').css('width',s); //设置屏幕宽度

    $("div#header").load('data/header.php',function(){
        tempName = sessionStorage.getItem('tempName');
        console.log(tempName);
        if(tempName!=null){
            $('#bt-login').html('你好,'+tempName);
            $('#register').html('退出');
            if($("#register").html()=='退出'){
                $("#register").bind('click',function(e){
                    e.preventDefault();
                    sessionStorage.removeItem("tempName");
                    tempName=null;

                    $("#register").html("注册");
                    $('#bt-login').html('登录');
                    $("#register").unbind('click');//解除click绑定,防止e.preventDefault()阻止跳转!
                })
            }
        }

    });
    $("div#footer").load('data/footer.php');
})

/**页面加载完成后，异步请求第1页产品列表**/
$(function(){
  loadProductByPage(1);
});

/**用户点击分页条中的页号时，异步加载相应pageNum对应的页面数据**/
$('.pager').on('click','a',function(event){
  event.preventDefault(); //阻止默认跳转行为
  //获取要跳转的页号
  if($(this).attr('href')=='首页'){  //单击首页时
	loadProductByPage(1);
  }else if($(this).attr('href')=='尾页'){  //单击尾页时
	loadProductLastPage();
  }else{  //单击非首、尾页时
	var pageNum = $(this).attr('href');
	loadProductByPage(pageNum);
  }
});

/*loadProductByPage函数:分页加载商品数据，并动态创建分页条*/
function loadProductByPage(pageNum ){
  $.ajax({
    url:'data/product_select.php?pageNum='+pageNum,
    success: function(pager){

      //遍历读取到分页器对象，拼接HTML，追加到DOM树
      var html = ''; 
      $.each(pager.data,function(i,p){
        html += `
          <li>
              <a href="detail.html"><img src="${p.pic}"></a>
              <p>￥${p.price}</p>
              <h1><a href="">${p.pname}</a></h1>
              <div>
                  <a href="" class="contrast"><i></i>对比</a>
                  <a href="" class="p-operate"><i></i>关注</a>
                  <a href="${p.pid}" class="addcart"><i></i>加入购物车</a>
              </div>
          </li>
        `;
      });
      $('#plist ul').html(html);

      //根据返回的分页数据，动态创建分页条内容
      var html = '';
		  html += `<li class="active"><a href="首页">首页</a></li> `;
		if((pager.pageNum -2)>0){
		  html += `<li><a href="${pager.pageNum-2}">${pager.pageNum-2}</a></li> `;}
		if((pager.pageNum-1)>0){
		  html += `<li><a href="${pager.pageNum-1}">${pager.pageNum-1}</a></li> `;}
		  html += `<li class="active"><a href="#">${pager.pageNum}</a></li> `;//当前页面数字
		if((pager.pageNum+1)<=pager.pageCount){
		  html += `<li><a href="${pager.pageNum+1}">${pager.pageNum+1}</a></li> `;}
		if((pager.pageNum+2)<=pager.pageCount){
		  html += `<li><a href="${pager.pageNum+2}">${pager.pageNum+2}</a></li> `;}
		  html += `<li class="active"><a href="尾页">尾页</a></li> `;//pageCount为总页数,也就是最后一页
      $('.pager').html(html);
    }
  });
}

/*loadProductLastPage函数:点击'尾页'时加载的页面*/
function loadProductLastPage(){
  $.ajax({
    url:'data/product_select_lastpage.php',
    success: function(pager){

      //遍历读取到分页器对象，拼接HTML，追加到DOM树
      var html = ''; 
      $.each(pager.data,function(i,p){
        html += `
          <li>
              <a href=""><img src="${p.pic}"></a>
              <p>￥${p.price}</p>
              <h1><a href="">${p.pname}</a></h1>
              <div>
                  <a href="" class="contrast"><i></i>对比</a>
                  <a href="" class="p-operate"><i></i>关注</a>
                  <a href="${p.pid}" class="addcart"><i></i>加入购物车</a>
              </div>
          </li>
        `;
      });
      $('#plist ul').html(html);

      //根据返回的分页数据，动态创建分页条内容
      var html = '';
	    html += `<li class="active"><a href="首页">首页</a></li> `;
		html += `<li class=""><a href="${pager.pageCount-2}">${pager.pageCount-2}</a></li> `;
		html += `<li class=""><a href="${pager.pageCount-1}">${pager.pageCount-1}</a></li> `;
		html += `<li class="active"><a href="${pager.pageCount}">${pager.pageCount}</a></li> `;
		html += `<li class="active"><a href="尾页">尾页</a></li> `;//pageCount为总页数,也就是最后一页
      $('.pager').html(html);
    }
  });
}

/*点登陆弹出登陆信息框*/
$("#header").on('click','#bt-login',function(e){
    e.preventDefault();
    $(".modal").fadeIn(500);
}) 


/*登录框验证*/
$("#btLogin").click(function(){
	var data=$("#login-form").serialize();
	console.log(data);
	//var un=uname.value;
	//var up=upwd.value;
	$.ajax({
		type:'post',
		url:'data/login.php',
		data:data,
		success:function(txt,msg,xhr){
			console.log("登陆验证:开始处理相应数据");
			if(txt==='ok'){
				$(".modal").fadeOut(300);
                tempName=$('[name="uname"]').val();
				$('#bt-login').html('欢迎回来:'+tempName);
				$("#register").html("退出");
                sessionStorage.setItem('tempName',tempName);


			}
			else{
				$(".modal .alert").html("密码或用户名错误,请重新输入!")
			}

            /*用户登出*/
            if($("#register").html()=='退出'){
                $("#register").bind('click',function(e){
                    e.preventDefault();
                    sessionStorage.removeItem("tempName");
                    tempName=null;

                    $('#shopping_count').css('display','none');
                    $("#register").html("注册");
                    $('#bt-login').html('登录');
                    $("#register").unbind('click');//解除click绑定,防止e.preventDefault()阻止跳转!
                })
            }
		}
	})
});

/*为添加购物车绑定监听事件*/
$("#plist ul").on("click",'a.addcart',function(e){
	e.preventDefault();
	var pid=$(this).attr('href');
	var uname=tempName;
	var $target=$(e.target);
	$.ajax({
		type:'post',
		url:'data/cart_add.php',
		data:{'pid':pid,'uname':uname},
          success: function(txt){
            if(txt=='fail'){
				alert('登陆后才能添加购物车!')
			}else{
				console.log('商品添加购物车成功!');
				$target.html("<i></i>已加入");
			}
          },
	})
});

/**跳转到购物车**/
$("#header").on("click",'#settle_up',function(){
    if(tempName==null){
        alert('登录后才能跳转到购物车页');
    }else{
        location.href='shoppingcart.html';
    }
})









