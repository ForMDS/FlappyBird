// 封装小鸟对象
(function ( Fly ) {
  'use strict';
  var Bird = function ( options ) {
    this.ctx = options.ctx;
    this.imgObj = options.imgObj;
    // 控制当前的帧数
    this.frameIndex = 0;
    this.a = 0.0006;
    this.y = 100;
    this.x = 100;
    // 瞬时速度（初始速度）
    this.speed = 0;
    // 最大旋转角度
    this.maxAngle = 45;
    // 达到最大旋转角度的最大速度
    this.maxSpeed = 0.4;
    // 当前角度 = 当前速度 / 最大速度 * 最大角度
    this.currentAngle = 0;
    this.imgW = this.imgObj.width / 3,
    this.imgH = this.imgObj.height;
    // 观察者数组
    this.listener = [];
  };
  Bird.prototype = {
    constructor: Bird,
    render: function ( t ) {
      // 绘制小鸟
      this.ctx.save();
      this.currentAngle = this.speed / this.maxSpeed * this.maxAngle;
      this.ctx.translate(100, this.y);
      // 此处注意应该先进行位移然后再旋转
      if (this.currentAngle >= this.maxAngle) {
        this.currentAngle = this.maxAngle;
      }
      this.ctx.rotate(Fly.toRadian(this.currentAngle));
      this.ctx.drawImage(this.imgObj, this.imgW * this.frameIndex++, 0, this.imgW, this.imgH, -1 / 2 * this.imgW, -1 / 2 * this.imgH, this.imgW, this.imgH);


      this.speed = this.speed + this.a * t; // 计算瞬时速度
      this.y = this.y + (this.speed * t + 1 / 2 * this.a * Math.pow(t, 2)); // 计算位移

      this.frameIndex %= 3;

      this.ctx.restore();

      // 每次渲染检测自身是否碰撞
      this.isDie();
    },
    // 添加订阅者
    addListener: function ( fn ) {
      this.listener.push( fn );
    },
    // 发布消息方法
    tigger: function () {
      this.listener.forEach(function(val) {
        val();
      });
    },
    // 碰撞检测
    isDie: function () {
      // 碰撞检测
      if (this.y - 9 <= 0 || this.y >= this.ctx.canvas.height - 112 || this.ctx.isPointInPath(this.x, this.y)) {
        // 发布消息
        this.tigger();
      }
    },
    changeSpeed:function ( speed ) {
      this.speed = speed;
    }
  };

  Fly.Bird = Bird;
})( Fly )