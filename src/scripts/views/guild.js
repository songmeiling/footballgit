var guildTpl=require('../templete/guild.string');
SPA.defineView('guild', {
  html:guildTpl,
  plugins: ['delegated'],
  bindActions: {
    'goto.index': function () {
      SPA.open('index');
    }
  },
  bindEvents: {
    'beforeShow': function() {
      var mySwiper = new Swiper('#swiper-container', {
        loop: false
      });
    }
  }
});