$(function(){
  var s=screen.availWidth;
  console.log(s);
  $('body').css('width',s);//设置屏幕宽度
})

/**对每个用户输入进行验证**/
$('#uname').blur(function(){
  if(this.validity.valueMissing){
    this.nextElementSibling.innerHTML = '用户名不能为空';
    this.nextElementSibling.className = 'msg-error';
    this.setCustomValidity('用户名不能为空');
  }else if(this.validity.tooShort){
    this.nextElementSibling.innerHTML = '用户名不能少于6位';
    this.nextElementSibling.className = 'msg-error';
    this.setCustomValidity('用户名不能少于6位');
  }else {
    this.nextElementSibling.innerHTML = '用户名格式正确';
    this.nextElementSibling.className = 'msg-success';
    this.setCustomValidity('');
  }
});
$('#uname').focus(function(){
  this.nextElementSibling.innerHTML = '用户名长度在6到9位之间';
  this.nextElementSibling.className = 'msg-default';
});

$('#uname').blur(function(){
});

/*对密码1进行验证*/
$('#upwd').blur(function(){
  if(this.validity.valueMissing){
    this.nextElementSibling.innerHTML = '密码不能为空';
    this.nextElementSibling.className = 'msg-error';
    this.setCustomValidity('密码不能为空');
  }else if(this.validity.tooShort){
    this.nextElementSibling.innerHTML = '密码不能少于8位';
    this.nextElementSibling.className = 'msg-error';
    this.setCustomValidity('密码不能少于8位');
  }else {
    this.nextElementSibling.innerHTML = '用户名格式正确';
    this.nextElementSibling.className = 'msg-success';
    this.setCustomValidity('');
  }
});
$('#upwd').focus(function(){
  this.nextElementSibling.innerHTML = '密码不能少于8位';
  this.nextElementSibling.className = 'msg-default';
});

/*对密码2进行验证*/
$('#upwd2').blur(function(){
  if(this.value!=''&&this.value==upwd.value){
    this.nextElementSibling.innerHTML = '输入正确';
    this.nextElementSibling.className = 'msg-success';
    this.setCustomValidity('');
  }
  if(this.value!=upwd.value){
    this.nextElementSibling.innerHTML = '两次密码不一致!';
    this.nextElementSibling.className = 'msg-error';
    this.setCustomValidity('两次密码不一致!!!!');
  }
  if(this.value==''){
    this.nextElementSibling.innerHTML = '请再次输入密码!';
    this.nextElementSibling.className = 'msg-error';
    this.setCustomValidity('密码不能为空');
  }
});
$('#upwd2').focus(function(){
  this.nextElementSibling.innerHTML = '需与第一次密码一致';
  this.nextElementSibling.className = 'msg-default';
});

/*邮箱验证*/
email.onblur = function(){
  if(this.validity.valueMissing){
    this.nextElementSibling.innerHTML = '邮箱不能为空';
    this.nextElementSibling.className = 'msg-error';
    this.setCustomValidity('邮箱不能为空');
  }else if(this.validity.typeMismatch){
    this.nextElementSibling.innerHTML = '邮箱格式不正确';
    this.nextElementSibling.className = 'msg-error';
    this.setCustomValidity('邮箱格式不正确');
  }else {
    this.nextElementSibling.innerHTML = '邮箱格式正确';
    this.nextElementSibling.className = 'msg-success';
    this.setCustomValidity('');
  }
}
email.onfocus = function(){
  this.nextElementSibling.innerHTML = '请输入合法的邮箱地址';
  this.nextElementSibling.className = 'msg-default';
}

/**实现异步的提交注册信息**/
function postData(){
  //表单序列化，获得所有的用户输入
  var data = $('#form-register').serialize();
  console.log(data);
  $.ajax({
    type: 'POST',
    url: 'data/user_add.php',
    data: data,
    success: function(result){
      console.log('开始处理服务器端返回的注册结果')
      //console.log(result);
      if(result.msg=='succ'){
        alert('注册成功！');
        location.href='productlist.html';
      }else {
        alert('注册失败！')
      }
    }
  });
  return false; //防止submit自己提交表单
}
