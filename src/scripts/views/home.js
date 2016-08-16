var homeTpl=require('../templete/home.string');
var fnUtil = require('../util/util.js');
SPA.defineView('home', {
  html:homeTpl,
   plugins:['delegated',{
        name:"avalon",
        options:function(vm){
         vm.livelist=[];
     	 vm.plainLivelist = [];
      	 vm.beautylist = [];
        }
    }],
  init:{	//为初始化，全局变量可放其中，
  	mySwiper:null,
  	mySlide:null/*,
  	formatData:function(data){
        var temp=[];
        for(var i=0;i<Math.ceil(data.length/2);i++){
            temp[i]=[];
            temp[i].push(data[i*2]);
            temp[i].push(data[i*2+1]);
        } 
        return temp;
        
     }*/
  },
  bindEvents:{
  	show:function(){
  		//足球生活，现场，切换
      this.mySwiper = new Swiper("#home-container",{ 
	        onSlideChangeStart:function(swiper){
	            var index=swiper.activeIndex;
	           $('.home-menu li').eq(index).addClass('active').siblings().removeClass('active');
	        }
    	});
    	//热点关注切换
    	this.mySlide = new Swiper("#hot-container",{ 
	        onSlideChangeStart:function(swiper){
	            var index1=swiper.activeIndex;
	           $('.home-tab span').eq(index1).addClass('active').siblings().removeClass('active');
	        }
    	});
    },
    beforeShow:function(){
        var self=this;
        //获取vm方法
        self.vm=self.getVM();
        
        //iscroll
    	// 上拉下拉
      var liveScroll = new IScroll('#liveScroll', {
        probeType: 3,
        mouseWheel: true
      });
      fnUtil.pullToRefresh({
        objScroll: liveScroll,
        ptrHeight: 35,
        loaderImg: '/footballgit/image/ajax-loader.gif',
        arrowImg: '/footballgit/image/arrow.png',
        head: $('.headdown img'),
        foot: $('.footup img'),
        view: self
      });
        //请求数据
       $.ajax({
        url:"/footballgit/mock/livelist.json",
        data:{},
        dataType:"json",
        success:function(res){
            if (res.ret) {
	            self.vm.livelist = fnUtil.dataFormat(res.data);
	            self.vm.plainLivelist = res.data;
	            /*setTimeout(function(){
	              avalon.scan(self.root, self.vm);
	              liveScroll.refresh();
	            },0);*/
	          } else {
	            console.log('数据有误，请稍后重试。');
	          }
        },
        error:function(){
            console.log("请求失败")
        }
       });
    }
  },
  //绑定元素的tap事件
	bindActions:{
	   "switch.home":function(e){	//足球现场美女生活切换
	     var index=$(e.el).index();
	     //mySwiper.slideTo(index,speed,runcallback)；runcallback可选，布尔值，true触发，false不触发；
	     this.mySwiper.slideTo(index);
	   },
	   "tab.hot":function(e){	//关注热点切换
	   		var index=$(e.el).index();
	   		this.mySlide.slideTo(index);
	   }
	}
});