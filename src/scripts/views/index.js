//引入模块
var indexTpl=require('../templete/index.string');
//定义视图
SPA.defineView('index', {
  //装载html
  html:indexTpl,
  //引入delegated事件，用于定义tab事件
  plugins:['delegated'],
  modules:[{
    name:'content',  //视图名称，用于引用的句柄
    defaultTag:'home',     //默认视图
    views:['home','search','my'],     //所有子视图
    container:'.m-content'      //子视图渲染到主页面时的容器
  }],
  //绑定视图事件
  bindEvents:{
  	show:function(){
  		/*//添加滚动条
  		var myscroll=new IScroll('#home-tab1');*/
     
  	}
  },
  //绑定元素的tap事件
  bindActions:{
    "tab.type":function(e,data){
      //添加类
      $(e.el).addClass('active').siblings().removeClass('active');
      //切换子视图,在html中写入data-tag="名字"（tag可随时取）
      this.modules.content.launch(data.tag);
    },
    "tab.exit":function(e){
      //添加类退出按钮
      $(e.el).addClass('active').siblings().removeClass('active');
       this.hide();
    },
    "goto.search":function(e,data){
      //添加类退出按钮
      $(e.el).addClass('active').siblings().removeClass('active');
      //切换子视图,在html中写入data-tag="名字"（tag可随时取）
      this.modules.content.launch(data.tag);
    },
    "goto.my":function(e,data){
      //添加类退出按钮
      $(e.el).addClass('active').siblings().removeClass('active');
      //切换子视图,在html中写入data-tag="名字"（tag可随时取）
      this.modules.content.launch(data.tag);
      SPA.open('my',{
        name:'dialog',
        width:200,
        height:150
      });
    }
  }
});
