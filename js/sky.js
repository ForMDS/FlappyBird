// 封装天空对象
(function ( Fly ) {
  'use strict';
  var Sky = function ( options ) {
    // 天空变量
    this.skyImg = options.skyImgObj;
    this.ctx = options.ctx;
    this.sky_x = options.sky_x || 0,
    this.sky_speed = -0.15;
  };
  Sky.prototype = {
    constructor: Sky,
    render: function ( t ) {
      // 绘制天空
      this.ctx.drawImage(this.skyImg, this.sky_x, 0);
      this.sky_x += t * this.sky_speed; // 匀速运动  位移=速度*时间

      if (this.sky_x <= -this.skyImg.width) {
        this.sky_x += this.skyImg.width * 2;
      }
    }
  };

  Fly.Sky = Sky;
})(Fly)