require('./lib/spa.min');
require('./lib/iscroll-probe');
require('./lib/swiper-3.3.1.min.js');

require('./views/index');
require('./views/home');
require('./views/my');
require('./views/search');
require('./views/guild');

//配置默认视图
SPA.config({
	indexView:'guild'
});