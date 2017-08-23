// 首页自动轮播图
function bannerImgs() {
	var i = 0;
	var $clone = $(".banner-imgs li").first().clone();//克隆第一张图片
	$(".banner-imgs").append($clone);//复制到列表最后
	var $size = $(".banner-imgs li").size();
	// 自动轮播
	var t = setInterval(function () { i++; move();},2000);
	// 鼠标悬停事件
	$(".index-banner").hover(function () {
	    clearInterval(t);//鼠标悬停时清除定时器
	}, function () {
	    t = setInterval(function () { i++; move(); }, 2000); //鼠标移出时清除定时器
	});
	$(".banner-nums li").hover(function () {
		var index = $(this).index();//获取当前索引值
		i = index;
		$(".banner-imgs").stop().animate({ left: -index * $width }, 500);
		$(this).addClass("cur-num").siblings().removeClass("cur-num");
	});
	var $width = $(".index-banner").width();
	function move() {
		// 当i等于5时，让第一张图片显示，i重新归一
		if(i == $size) {
		    $(".banner-imgs").css({left: 0});
		    i = 1;
		}
		// 停止之前动画，执行新的动画
		$(".banner-imgs").stop().animate({left: -i * $width }, 500);

		if(i == $size - 1) {
			$(".banner-nums li").eq(0).addClass("cur-num").siblings().removeClass("cur-num");
		}else {
			$(".banner-nums li").eq(i).addClass("cur-num").siblings().removeClass("cur-num");
		}
	}	
}

function showIndexCont() {
	$(window).scroll(function() {
		// 当滚动条位置大于240时，出现案例区域
		if($(window).scrollTop() > 240) {
			$(".case-content").animate({marginLeft:"0",opacity:"1"},500,"linear");
		}
		// 当滚动条位置大于640时，出现全景展示区域
		if($(window).scrollTop() > 640) {
			$(".all-view-content").animate({opacity:"1"},500,"linear");
			$(".all-view-content-left").animate({marginLeft:"0",opacity:"1"},500,"linear");
			$(".all-view-content-right").animate({marginRight:"0",opacity:"1"},500,"linear");
		}
		// 当滚动条位置大于1240时，出现朗域知道和最新资讯区域
		if($(window).scrollTop() > 1240) {
			$(".content").animate({opacity:"1"},500,"linear");
			$(".knowledges").animate({marginLeft:"0",opacity:"1"},500,"linear");
			$(".news").animate({marginRight:"0",opacity:"1"},500,"linear");
		}
	});
}

// 全景体验-自动向上滚动
function Marquee(){
	var demo = document.getElementById("demo");
	var demo1 = document.getElementById("demo1");
	var demo2 = document.getElementById("demo2");
	// 拷贝demo1的内容,实现无缝接合
	demo2.innerHTML = demo1.innerHTML;
	// 当demo1滚动完时
  if(demo2.offsetTop - demo.scrollTop <= 0){
  	// demo跳到最顶端
   demo.scrollTop -= demo1.offsetHeight;
  }else{
  	// 实现自动向上滚动
   demo.scrollTop++;
  }
}

// 案例详情切换图片
function caseImg() {
	// 找到大图
	var mainPic = document.getElementById("main-pic");
	var mainPics = mainPic.getElementsByTagName("li");
	// 找到小图
	var subPic = document.getElementById("sub-pic");
	var subPics = subPic.getElementsByTagName("img");
	for(var i=0,len=subPics.length; i<len; i++) {
		(function(i) {
			// 绑定鼠标划入事件
			subPics[i].onmouseover = function() {
				// 先让所有图片不显示
				for(var j=0; j<len; j++) {
					subPics[j].className = "";
					mainPics[j].className = "";
				}
				// 鼠标划入显示该图片
				this.className = "cur";
				mainPics[i].className = "show";
			};
		})(i);
	}
}

// 关于我们选项卡切换
function showContent() {
	var title = document.getElementById("tab-title");
	var titles = title.getElementsByTagName("a");
	var content = document.getElementById("tab-content");
	var contents = content.getElementsByTagName("div");
	var arr = [];
	for(var i=0,len=contents.length; i<len; i++) {
		if(contents[i].className == "page-content" || contents[i].className == "page-content show") {
			arr.push(contents[i]);
		}
	}
	for(var i=0,len=titles.length; i<len; i++) {
		(function(i) {
			titles[i].onclick = function() {
				for(var j=0; j<len; j++){
					titles[j].className = "";
					arr[j].className = "page-content";
				}
				this.className = "cur";
				arr[i].className = "page-content show";
			};
		})(i);
	}
}

// 联系我们表单验证
// 判断用户名
function testUserName() {
	var $userName = $(".user-info input[type='text']").val();
	var $tip = $(".user-info li:first span");
	if($userName == "") {
		$tip.html("用户名不能为空!").css({opacity:"1"});
	}else if(!(/^[a-zA-Z]\w{5,17}$/.test($userName))) {
		$tip.html("长度在6-18之间").css({opacity:"1"});
	}else {
		$tip.css({opacity:"0"});
	}
}
// 提示用户输入密码
function testPwd() {
	var $pwd = $(".user-info input[type='password']").val();
	var $tip = $(".user-info").find("span").eq(1);
	if( $pwd == "") {
		$tip.html("您的密码不能为空!").css({opacity:"1"});
	}else if(!(/^[0-9A-Za-z]{6,18}$/.test($pwd))) {
		$tip.html("长度在6-18之间").css({opacity:"1"});
	}else {
		$tip.css({opacity:"0"});
	}
}
// 提示用户输入正确的邮箱
function testEmail() { 
	var $email = $(".user-info input[type='email']").val();
	var $tip = $(".user-info").find("span").eq(2);
	if($email == "") {
		$tip.html("请输入您的电子邮箱!").css({opacity:"1"});
	}else if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email))) {
		$tip.html("请输入正确的电子邮箱!").css({opacity:"1"});
	}else {
		$tip.css({opacity:"0"});
	}
}