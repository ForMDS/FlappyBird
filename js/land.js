// 封装陆地对象
(function ( Fly ) {
  'use strict';
  var Land = function ( options ) {
    this.ctx = options.ctx;
    this.img = options.img;
    this.imgW = this.img.width;
    this.imgH = this.img.height;
    this.x = options.x || 0;
    this.y = this.ctx.canvas.height - this.imgH;
    this.speed = -0.15;
  };
  Land.prototype.render = function ( t ) {
    this.ctx.drawImage(this.img,this.x,this.y);
    this.x += t * this.speed;
    if(this.x <= -this.imgW){
      this.x += this.imgW * 4;
    }
  };

  Fly.Land = Land;
})( Fly )