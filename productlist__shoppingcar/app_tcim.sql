set names utf8;
drop database if exists app_tcimoltp;
create database app_tcimoltp charset=utf8;
use app_tcimoltp;
CREATE TABLE im_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR(128),
  homepage VARCHAR(64),
  age INT
);
INSERT INTO im_user VALUES
(1, '张三', '123456','12345678@qq.com','',26),
(2, '李四', '456789','23456789@qq.com','',25);


create table im_product(
	pid  int primary key auto_increment,
	pname varchar(32),
	price float(10,2),
	pic varchar(100)
);
INSERT INTO im_product VALUES
(1,'鑫海视42/43/49/50/55/65英寸落地立式液晶网络广告机触摸屏一体机带移动轮子',18000.00,'images/product/machine_01.jpg'),
(2,'倚昌幼儿园55英寸触控交互式多媒体电子白板教学一体机培训会议多功能红外触摸一体机',7200.00,'images/product/machine_02.jpg'),
(3,'得丽珑 17英寸电阻触摸屏一体机工业平板电脑触控点餐收款台式工控机 17电阻',2028.00,'images/product/machine_03.jpg'),
(4,'长信(ChangXin)70英寸智能触控互动教学培训会议一体机多媒体电子白板触摸一体机',20300.00,'images/product/machine_04.jpg'),
(5,'互视达 55英寸立式落地广告机 触摸一体机 智能触控分屏广告播放器 LED液晶一体机',9188.00,'images/product/machine_05.jpg'),
(6,'长信(ChangXin)50英寸落地款触摸屏多媒体电脑教学一体机触控电子白板电视一体机',7600.00,'images/product/machine_06.jpg'),
(7,'天创科林触控触摸一体机TK-MEL81立式查询机政务司法系统多点红外触控 32英',12888.00,'images/product/machine_07.jpg'),
(8,'中银（BOCT）BT4200-C1-K2 42英寸立式触摸查询一体机智能触控电脑一体机',7599.00,'images/product/machine_08.jpg'),
(9,'飞利浦（PHILIPS）BDL8430QT 84英寸智能会议电子白板 会议平板 触摸一体机',59999.00,'images/product/machine_09.jpg'),
(10,'84英寸液晶触摸电脑一体机 可选落地和壁挂安装 内置windows系统 支持教育一体机',43200.00,'images/product/machine_10.jpg'),
(11,'中银（BOCT）GW55-H0D 55英寸立式安卓一体机触摸广告机楼宇数字媒体播放一体机',6999.00,'images/product/machine_11.jpg'),
(12,'优色USER32英寸LED高清仿苹果安卓/PC/I3 两点触控触摸一体机/数字标牌/',1800.00,'images/product/machine_12.jpg'),
(13,'影巨人安卓吧台广告机 网络广告机 触摸安卓一体机 电容触摸屏 10.1寸超高清IPS',599.00,'images/product/machine_13.jpg'),
(14,'仙视（Goodview）GM70S2 70英寸智能会议电子白板 会议平板 触摸一体机',19999.00,'images/product/machine_14.jpg'),
(15,'影巨人触摸查询一体机 网络广告机 安卓触摸广告机 电容触摸屏 塑胶外壳 15.6寸',1298.00,'images/product/machine_15.jpg'),
(16,'华彩12.3英寸竖屏式广告机 液晶触摸触控显示器 单机版网络液晶广告机触控一体机',1280.00,'images/product/machine_16.jpg'),
(17,'学之友75英寸多媒体一体机1080P商用显示器高清液晶显示广告机触摸电视电脑一体机',1200.00,'images/product/machine_17.jpg'),
(18,'华彩17英寸壁挂式广告机 安卓数字标牌液晶触摸触控显示器 x86电脑触摸一体机',4399.00,'images/product/machine_18.jpg'),
(19,'长臂猿 电脑显示器支架壁挂一体机挂架(13"-42") 0-37kg触摸屏支架FST110W',3899.00,'images/product/machine_19.jpg'),
(20,'金视野42英寸50英寸55英寸LED智能数字标牌安卓立式广告机电脑触控一体机',3149.00,'images/product/machine_20.jpg'),
(21,'金为 65英寸触控一体机液晶触摸屏显示触摸一体机 交互式 触摸查询一体机',11000.00,'images/product/machine_21.jpg'),
(22,'悦纳 32/42/55/65英寸卧式查询一体机 触摸一体机人字触控多媒体落地式广告机',3188.00,'images/product/machine_22.jpg'),
(23,'致境ZJ-42广告机全高清触摸一体机晶立式广告机落地竖式带触控交互触控一体机',5200.00,'images/product/machine_23.jpg'),
(24,'科芒 32/42/47/55/65英寸卧式触摸一体机 多点触控广告机 网络播放高清液晶显示一体机 ',6588.00,'images/product/machine_24.jpg'),
(25,'互视达 32/42/55英寸卧式触控查询一体机触摸查询机广告机展示液晶播放器 ',6388.00,'images/product/machine_25.jpg'),
(26,'悦纳 32/42/55/65英寸卧式查询一体机 触摸一体机人字触控多媒体落地式广告机 ',9538.00,'images/product/machine_26.jpg'),
(27,'思惠拓 32/42/47英寸卧式触控查询机 安卓网络版触摸广告机展示查询一体机',18888.00,'images/product/machine_27.jpg'),
(28,'浩鑫准系统X50V4 mini迷你主机小电脑一体机 触摸屏 准系统 不含内存硬盘',3400.00,'images/product/machine_28.jpg'),
(29,'易乐看 WF3201T 32英寸10点电容触摸全高清数字标牌液晶壁挂广告机安卓触控一体机',3099.00,'images/product/machine_29.jpg'),
(30,'T.K天创科林TK-MED80-15X2 自助双屏访客机 台式液晶触摸屏访客机 白色',27500.00,'images/product/machine_30.jpg'),
(31,'飞利浦 （PHILIPS） BDL5530QT 55英寸智能会议电子白板 会议平板 触摸一体机',12539.00,'images/product/machine_31.jpg'),
(32,'寒子城 Enhav750双屏触摸收银机一体机触摸屏收款机超市收银机餐饮奶茶店点餐一体机',2498.00,'images/product/machine_32.jpg'),
(33,'ZUCON超窄型触摸按键门禁一体机 X8门禁系统读卡器 ID、IC密码刷卡门禁主机 ',599.00,'images/product/machine_33.jpg'),
(34,'二维火FS2000风尚版收银机一体机触摸屏奶茶店收款机 餐饮点餐机收银系统',749.00,'images/product/machine_34.jpg'),
(35,'耐诺科技 22寸触摸查询一体机 支持3Gwifi 键盘输入',8699.00,'images/product/machine_35.jpg'),
(36,'爱宝AB-300收银机触摸屏一体机 奶茶餐饮快餐酒楼收款机 点餐机 单机',1299.00,'images/product/machine_36.jpg');

create table im_cart(
	cid int primary key auto_increment,
	userId int
);
insert into `im_cart` values('100','1');

create table im_cart_detail(
	did int primary key auto_increment,
	carId int,
	productId int,
	count int
);
insert into im_cart_detail values(null,'100','10',3),(null,'100','15','1'),(null,'100','18','2');

