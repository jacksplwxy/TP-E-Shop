var zoom={
  moved:0,//保存左移的li个数
  WIDTH:62,//保存每个li的宽度
  OFFSET:20,//保存ul的起始left值
  MAX:1,//保存可左移的最多li个数
  MSIZE:175,//保存mask的大小
  MAXLEFT:175,MAXTOP:175,//保存mask可用的最大坐标
  init:function(){
    //为id为preview下的h1添加单击事件代理，仅a能响应事件，事件处理函数为move
    $("#preview>h1").on(
      "click","a",this.move.bind(this));
    //为id为icon_list的ul添加鼠标进入事件代理，仅li下的img可响应事件，处理函数为changeImgs
    $("#icon_list").on(
      "mouseover","li>img",this.changeImgs);
    //为id为superMask的div添加hover事件,切换mask的显示和隐藏,再绑定鼠标移动事件为moveMask
    $("#superMask").hover(this.toggle,this.toggle)
                   .mousemove(
                      this.moveMask.bind(this));
  },
  moveMask:function(e){
    var x=e.offsetX;//获得鼠标相对于父元素的x
    var y=e.offsetY;//获得鼠标相对于父元素的y
    //计算mask的left: x-MSIZE/2
    var left=x-this.MSIZE/2;
    //计算mask的top: y-MSIZE/2
    var top=y-this.MSIZE/2;
    //如果left越界，要改回边界值
    left=left<0?0:
         left>this.MAXLEFT?this.MAXLEFT:
         left;
    //如果top越界，要改回边界值
    top=top<0?0:
        top>this.MAXTOP?this.MAXTOP:
        top;
    //设置id为mask的元素的left为left,top为top
    $("#mask").css({left:left,top:top});
    //设置id为largeDiv的背景图片位置:
    $("#largeDiv").css(
      "backgroundPosition",
      -left*16/7+"px "+-top*16/7+"px");
  },
  toggle:function(){//切换mask的显示和隐藏
    $("#mask").toggle();
    $("#largeDiv").toggle();
  },
  move:function(e){//移动一次
    var $target=$(e.target);//获得目标元素$target
    var btnClass=$target.attr("class");
    //如果btnClass中没有disabled
    if(btnClass.indexOf("disabled")==-1){
      //如果btnClass以forward开头
        //将moved+1
      //否则
        //将moved-1
      this.moved+=
        btnClass.indexOf("forward")!=-1?1:-1;
      //设置id为icon_list的ul的left为-moved*WIDTH+OFFSET
      $("#icon_list").css(
        "left",-this.moved*this.WIDTH+this.OFFSET);
      this.checkA();//检查a的状态:
    }
  },
  checkA:function(){//检查两个a的状态
    //查找class属性以backward开头的a，保存在$back
    var $back=$("a[class^='backward']");
    //查找class属性以forward开头的a，保存在$for
    var $for=$("a[class^='forward']");
    if(this.moved==0){//如果moved等于0
      //设置$back的class为backward_disabled
      $back.attr("class","backward_disabled");
      $for.attr("class","forward");
    }else if(this.moved==this.MAX){
      //否则，如果moved等于MAX
      //设置$for的class为forward_disabled
      $for.attr("class","forward_disabled");
      $back.attr("class","backward");
    }else{//否则
      //$back的class为backward
      $back.attr("class","backward");
      //$for的class为forward
      $for.attr("class","forward");
    }
  },
  changeImgs:function(e){//根据小图片更换中图片
    //获得目标元素的src属性，保存在变量src中
    var src=$(e.target).attr("src");
    //查找src中最后一个.的位置i
    var i=src.lastIndexOf(".");
    //设置id为mImg的元素的src为:
      //src从开头-i 拼上-m  拼上src从i到结尾
    $("#mImg").attr(
      "src",src.slice(0,i)+"-m"+src.slice(i));
    $("#largeDiv").css(
      "backgroundImage",
      "url("+src.slice(0,i)+"-l"+src.slice(i)+")"
    );
  }
}
zoom.init();

/**************************************************************************/
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