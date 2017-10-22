/* ************************轮播******************************* */
/*广告图片数组*/
var imgs=[
  {"i":0,"img":"productlist__shoppingcar/images/banner/banner_01.jpg"},
  {"i":1,"img":"productlist__shoppingcar/images/banner/banner_02.jpg"},
  {"i":2,"img":"productlist__shoppingcar/images/banner/banner_03.jpg"},
  {"i":3,"img":"productlist__shoppingcar/images/banner/banner_04.jpg"},
  {"i":4,"img":"productlist__shoppingcar/images/banner/banner_05.jpg"},
];
var slider={
  LIWIDTH:0,//保存每个li的宽度,其实就是#slider的宽
  DURATION:1000,//动画的总时间
  WAIT:3000,//自动轮播之间的等待时间
  timer:null,//保存一次性定时器序号
  canAuto:true,//保存是否可以自动轮播
  init:function(){
    this.LIWIDTH=parseFloat(
        $("#slider").css("width")
    );
    this.updateView();
    //为id为indexs的ul添加鼠标进入事件代理，只有不是hover的li才能响应事件
    $("#indexs").on("mouseover","li:not(.hover)",
        function(e){
          //获得目标元素$target
          var $target=$(e.target);
          //调用move方法，传入要移动的个数:
          //目标元素的内容-目标元素的兄弟中class为hover的li的内容
          this.move($target.html()
              -$target.siblings(".hover").html());
        }.bind(this));
    //当鼠标进入#slider时，将canAuto改为false
    //当鼠标移出#slider时，将canAuto改为true
    $("#slider").hover(
        function(){this.canAuto=false;}.bind(this),
        function(){this.canAuto=true;}.bind(this)
    )
    this.autoMove();
  },
  autoMove:function(){//启动自动轮播
    //启动一次性定时器:
    this.timer=setTimeout(
        function(){
          if(this.canAuto){
            this.move(1);//调用move执行移动一个
          }else{
            this.autoMove();//继续等待
          }
        }.bind(this),
        this.WAIT
    );
  },
  move:function(n){
    clearTimeout(this.timer);//停止一次性定时器
    this.timer=null;
    $("#imgs").stop(true);//停止动画，防止叠加
    if(n<0){//如果n<0,右移，先改数组，再移动
      n*=-1;//将n转为正数
      imgs=//先删除结尾的n个元素，拼接到开头
          imgs.splice(imgs.length-n,n).concat(imgs);
      this.updateView();//更新界面
      //获得#imgs当前的left,转为浮点数
      var left=parseFloat($("#imgs").css("left"));
      //修改#imgs的left为left-n*LIWIDTH
      $("#imgs").css("left",left-n*this.LIWIDTH);
      //启动动画，在DURATION时间内，left移动到0
      $("#imgs").animate(
          {left:"0"},
          this.DURATION,
          this.autoMove.bind(this)
      );
    }else{//否则, 左移,先移动，再改数组
      //让#imgs的ul再DURATION事件内，left变为-n*LIWIDTH
      $("#imgs").animate(
          {left:-n*this.LIWIDTH+"px"},
          this.DURATION,
          //在动画结束后调用endMove,替换this，传入参数n
          this.endMove.bind(this,n)
      );
    }
  },
  endMove:function(n){
    //删除imgs开头的n个元素,再拼到结尾
    imgs=imgs.concat(imgs.splice(0,n))
    this.updateView();//更新页面
    $("#imgs").css("left",0);//设置#imgs的left为0
    this.autoMove();//启动自动轮播
  },
  updateView:function(){//将数组中的元素更新到页面
    //遍历imgs数组中每个对象,同时声明空字符串html
    for(var i=0,html="",idxs="";i<imgs.length;i++){
      html+="<li><img src='"+imgs[i].img+"'></li>";
      idxs+="<li>"+(i+1)+"</li>";
    }
    //设置id为imgs的内容为html,再设置其宽为LIWIDTH*imgs的元素个数
    $("#imgs").html(html)
        .css("width",this.LIWIDTH*imgs.length);
    //设置id为indexs的内容为idxs
    $("#indexs").html(idxs);
    //获得#indexs下的和imgs中第一个元素的i属性对应的li,设置其class为hover,选择兄弟中的class为hover的li,清除其class
    $("#indexs>li:eq("+imgs[0].i+")")
        .addClass("hover")
        .siblings(".hover").removeClass("hover");
  }
}
slider.init();







/* ************************电梯******************************* */
var elevator={
  FHEIGHT:0,//保存楼层的高度
  //保存亮灯区域上下边界距文档显示区顶部距离
  UPLEVEL:0, DOWNLEVEL:0,
  DURATION:1000,//动画持续时间
  init:function(){
    this.FHEIGHT=//#f1的高+#f1的marginBottom
        parseFloat($("#f1").css("height"))+
        parseFloat($("#f1").css("marginBottom"));
    this.UPLEVEL=//(innerHeight-FHEIGHT)/2
        (innerHeight-this.FHEIGHT)/2
    this.DOWNLEVEL=//UPLEVEL+FHEIGHT
        this.UPLEVEL+this.FHEIGHT;
    //为document绑定scroll事件为scroll方法
    $(document).scroll(this.scroll.bind(this));
    //为#elevator下的ul添加mouseover事件代理,只有li才能响应事件
    $("#elevator>ul").on("mouseover","li",
        function(e){//target: li a
          var $target=$(e.target);//获得目标元素
          if(e.target.nodeName=="A"){//如果target是a
            $target=$target.parent();//换成其父元素li
          }
          //$target中显示第2个a，隐藏第1个a
          $target.children(":first").hide();
          $target.children(":last").show();
        }
    );
    //为#elevator下的ul添加mouseout事件代理，只有li响应事件
    $("#elevator>ul").on("mouseout","li",
        function(e){
          var $target=$(e.target);
          if(e.target.nodeName=="A"){//如果target是a
            $target=$target.parent();//就改为其父元素
          }
          //获得$target在ul下的下标
          var i=$target.index("#elevator>ul>li");
          //查找.floor下的header下的span取第i个
          var $span=$(".floor>header>span:eq("+i+")");
          //如果span的class没有hover
          if(!$span.hasClass("hover")){
            //$target中显示第1个a，隐藏第2个a
            $target.children(":first").show();
            $target.children(":last").hide();
          }
        }
    );
    //为#elevator下的ul添加click事件代理,只有li下class为etitle的a才能响应事件
    $("#elevator>ul").on("click","li>a.etitle",
        function(e){
          //停止body上的动画，清空队列
          $("body").stop(true);
          //获得目标元素的父元素$li
          var $li=$(e.target).parent();
          //获得$li在所有li中的下标i
          var i=$li.index("#elevator>ul>li");
          //查找.floor下的header下的span中第i个$span
          var $span=
              $(".floor>header>span:eq("+i+")");
          //启动动画，让body在DURATION时间内，滚动到$span距页面顶部的总距离-UPLEVEL
          $("body").animate(
              {scrollTop:
              $span.offset().top-this.UPLEVEL},
              this.DURATION
          );
        }.bind(this)
    );
  },
  scroll:function(){//响应document的scroll事件
    //查找.floor下的header下的span，对每个元素执行:
    $(".floor>header>span").each(function(i,elem){
      //function(i,elem){i: 下标, elem:当前DOM元素}
      //获取当前元素elem距页面顶部的总距离totalTop
      var totalTop=$(elem).offset().top;
      //获取body滚动过的距离scrollTop
      var scrollTop=$("body").scrollTop();
      //用totalTop-scrollTop，保存在innerTop
      var innerTop=totalTop-scrollTop;
      //如果innerTop>UPLEVEL且<=DOWNLEVEL
      if(innerTop>this.UPLEVEL
          &&innerTop<=this.DOWNLEVEL){
        //设置当前元素elem的class为hover
        $(elem).addClass("hover");
        //对应的li中显示第2个a，隐藏第1个a
        $("#elevator>ul>li:eq("+i+")>a:first")
            .hide();
        $("#elevator>ul>li:eq("+i+")>a:last")
            .show();
      }else{//否则,就移除当前元素elem的hover类
        $(elem).removeClass("hover");
        $("#elevator>ul>li:eq("+i+")>a:first")
            .show();
        $("#elevator>ul>li:eq("+i+")>a:last")
            .hide();
      }
    }.bind(this));
    //查找.floor下的header下的span中class为hover的，如果找到，就设置#elevator显示,否则就隐藏
    $(".floor>header>span.hover").length>0?
        $("#elevator").show():$("#elevator").hide();
  }
}
elevator.init();
/***************************************电梯结束**************************************************/



/*点登陆弹出登陆信息框*/
$('#bt-login').on('click',function(e){
  e.preventDefault();
  $(".modal").fadeIn(500);
})

//加载页面时设置body宽度,导入sessionStorage的存储值
var tempName=null;
$(function(){
        var s=screen.availWidth;
        console.log(s);
        $('body').css('width',s);

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
})

/*登录框验证*/
$("#btLogin").click(function(){
  var data=$("#login-form").serialize();
  console.log(data);
  //var un=uname.value;
  //var up=upwd.value;
  $.ajax({
    type:'post',
    url:'productlist__shoppingcar/data/login.php',
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
            sessionStorage.removeItem("shopping_count");
            shopping_count=null;

          $("#register").html("注册");
          $('#bt-login').html('登录');
          $("#register").unbind('click');//解除click绑定,防止e.preventDefault()阻止跳转!
        })
      }
    }
  })
});

/**跳转到购物车**/
$('#settle_up').on("click",function(){
  if(tempName==null){
    alert('登录后才能跳转到购物车页');
  }else{
    location.href='productlist__shoppingcar/shoppingcart.html';
  }
});

/**搜索框自动填写**/
$('#txtSearch').keyup(function(){
    var k = this.value;
    if(!k){ //用户没有任何输入
        $("#suggest").css('display','none');
        return;
    }
    /**发起异步请求，获取包含当前关键字的产品名称**/
    //1
    var xhr = new XMLHttpRequest();
    //2
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4){
            if(xhr.status===200){
                doResponse(xhr);
            }else {
                alert('响应完成但有问题');
            }
        }
    }
    //3
    xhr.open('GET','productlist__shoppingcar/data/search.php?kw='+k, true);
    //4
    xhr.send(null);

    function doResponse(xhr){
        console.log('开始处理响应数据');
        //console.log(xhr);
        $("#suggest").css('display','block');
        var ul = document.querySelector('#suggest ul');
        ul.innerHTML = xhr.responseText;
    }
})

/*将后台获取的建议项写入搜索框中*/
$('#suggest ul').on('click','li',function(e){
    var $target=$(e.target);
    $('#txtSearch').val($target.html());
    $("#suggest").css('display','none');
})

