// 封装管道对象
(function ( Fly ) {
  'use strict';
  var Pipe = function ( options ) {
    this.ctx = options.ctx;
    this.imgPipeTop = options.topImg;
    this.imgPipeBottom = options.bottomImg;
    // 宽度和高度
    this.imgW = this.imgPipeTop.width;
    this.imgH = this.imgPipeTop.height;
    // x 坐标
    this.x = options.x || 0;
    // y 坐标
    this.topY = 0;
    this.bottomY = 0;
    // 速度
    this.speed = -0.15;
    // 管道之间的间隙
    this.pipeSpace = 130;

    this.RandomTopHeight();
  };
  Pipe.prototype = {
    constructor: Pipe,
    render: function ( t ) {
      var ctx = this.ctx;
      ctx.drawImage(this.imgPipeTop,this.x,this.topY);
      ctx.drawImage(this.imgPipeBottom,this.x,this.bottomY);

      // 绘制管道路径，用于碰撞检测
      ctx.rect(this.x,this.topY,this.imgW,this.imgH);
      ctx.rect(this.x,this.bottomY,this.imgW,this.imgH);
      // ctx.fill();

      this.x += t * this.speed;
      if(this.x <= -this.imgW){
        this.x += this.imgW * 3 * 6;
        this.RandomTopHeight();
      }
    },
    // 随机生成管道高度方法
    RandomTopHeight: function () {
      // 50-250之间
      var random = Math.random() * 200 + 50;
      this.topY = -(this.imgH - random);
      this.bottomY = this.pipeSpace + random;
    }
  };

  Fly.Pipe = Pipe;
})( Fly )