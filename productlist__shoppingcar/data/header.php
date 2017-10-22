<?php
header('Content-Type: text/html');
?>

<!--页面顶部! -->
        <header id="top">
            <p class="lf">您好，欢迎来到最专业的触摸一体机交易平台!</p>
            <ul class="lf">
                <li><a href="#" id='bt-login'>登录</a></li>
                <li><a href="register.html" id='register'>注册</a></li>
                <li><a href="#">我的订单</a></li>
                <li><a href="#">最近浏览 </a> <img src="images/arrows.png" alt=""/> </li>
                <li>
                    <a href="#">我是商家  </a> <img src="images/arrows.png" alt=""/>
                    <div id="merchant_box">
                        <ul>
                            <li><a href="#">用户中心</a></li>
                            <li><a href="#">我想合作</a></li>
                        </ul>
                    </div>
                </li>

                <li><a href="#">帮助中心</a></li>
            </ul>
        </header>

        <!--LOGO和搜索框! -->
        <div id="top_main">
            <a href="#" class="lf">
                <img src="images/logo/logo-icon.jpg" alt="LOGO" style='width:270px;height:60px'/>
            </a>
            <div id="search_box" class="lf">
                <div class="search">
                    <input id="txtSearch" type="text" class="text" />
                    <input class="button" name="" type="button" value="搜&nbsp;&nbsp;&nbsp;索" />
                </div>
            </div>
            <div id="settle_up" class="lf">
                去购物车结算<b></b>
            </div>
        </div>

        <!--主导航 -->
        <nav id="nav">
            <div id="category">
                <a href="#">全部商品分类</a>

            </div>
            <ul id="nav_items">
                <li><a href="../index.html">首页</a></li>
                <li><a href="productlist.html">产品中心</a></li>
                <li><a href="#">购机惠</a></li>
                <li><a href="#">B2B</a></li>
                <li><a href="#">解决方案</a></li>
                <li><a href="#">软件买卖</a></li>
                <li><a href="#">配件商城</a></li>
                <li><a href="#">技术论坛</a></li>
            </ul>
        </nav>