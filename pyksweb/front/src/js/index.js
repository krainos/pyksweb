
function Banner() {
    this.bannerWidth = 798;
    this.bannerGroup = $("#banner-group");
    this.index = 1;
    this.rightArrow = $('.right-arrow');
    this.leftArrow = $('.left-arrow');
    this.bannerUl = $("#banner-ul");
    this.liList = this.bannerUl.children("li");
    this.bannerCount = this.liList.length;
    this.pageControl = $(".page-conrol");

}

Banner.prototype.initBanner = function(){
    var self = this;


    var firstBanner = self.liList.eq(0).clone();
    var lastBanner = self.liList.eq(self.bannerCount-1).clone();
    self.bannerUl.append(firstBanner);
    self.bannerUl.prepend(lastBanner);
    self.bannerUl.css({"width":self.bannerWidth*(self.bannerCount+2),'left':-self.bannerWidth});

};


Banner.prototype.initPageControl = function(){
    var self = this;

    for(var i = 0; i< self.bannerCount; i++){
        var circle = $("<li></li>");
        self.pageControl.append(circle);
        if (i ===0){
            circle.addClass("active");
        }
    }
    self.pageControl.css({"width":self.bannerCount*12+8*2+16*(self.bannerCount-1)});
    //pageControl.css({"width":self.bannerCount*12+8*2+})

};

Banner.prototype.toggleArow = function(isShow){
    var self = this;
    if (isShow){
         self.leftArrow.show();
         self.rightArrow.show();
    }else{
        self.leftArrow.hide();
        self.rightArrow.hide();
    }

};

Banner.prototype.listenBannerHover = function(){
    var self =this;
  //  self.toggleArow();
    this.bannerGroup.hover(function () {
        //移动鼠标函数
        clearInterval(self.timer);
        self.toggleArow(true);
    },function () {
        //移动鼠标函数
        self.loop();
        self.toggleArow(false);
    });
};

Banner.prototype.listenPageControl = function(){
    var self = this;
    self.pageControl.children("li").each(function(index,obj){
        $(obj).click(function () {
           self.index = index;
           self.animate();


        });
    });
};

Banner.prototype.animate = function(){
    var self = this;
    this.bannerUl.animate({"left":-798*self.index},500);
    var index = self.index;
    if (index ===0){
        index = self.bannerCount-1;
    }else if (index === self.bannerCount+1){
        index = 0;
    }else{
        index= self.index - 1;
    }
    self.pageControl.children('li').eq(index).addClass("active").siblings().removeClass('active');
};


Banner.prototype.loop = function(){
    var self = this;
    //bannerUl.animate({"left":-798},500)

    //定时器
    this.timer =  setInterval(function () {
        //循环
        if (self.index >= self.bannerCount+1){
            //self.bannerUl.css({"left":-self.bannerWidth});
            self.bannerUl.css({"left":-self.bannerWidth});
            self.index = 2;
        }else{
            self.index++;
        }
      self.animate();
    },2000);

};



Banner.prototype.listenArrowClick = function(){
    var self = this;
    self.leftArrow.click(function () {
        if(self.index === 0){
            //
            self.bannerUl.css({"left":-self.bannerCount*self.bannerWidth});
             self.index =self.bannerCount - 1;
        }else {
            self.index--;
        }
       self.animate();
    });

    self.rightArrow.click(function () {
        if(self.index === self.bannerCount + 1){
            self.bannerUl.css({"left":-self.bannerWidth})
            self.index = 2;
        }else {
            self.index++;
        }
        self.animate();
    });

};

Banner.prototype.run = function () {
    this.initBanner();
    this.initPageControl();
    this.loop();
    this.listenPageControl();
    this.listenArrowClick();
    this.listenBannerHover();
};


$(function () {
    var banner = new Banner();
    banner.run();
});