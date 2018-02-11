(function ( Fly ) {
  'use strict';
  var Game = function ( id ) {
    this.ctx = Fly.creatCv( id );
    this.cv = this.ctx.canvas;
    this.lastFrameTime = new Date();
    this.currentFrameTime = 0;
    // 创建数组存放所有游戏对象
    this.rolesList = [];
    // 是否进行游戏开关
    this.isStart = true;
    // 游戏资源
    this.imgArr = ['birds', 'land', 'pipe1', 'pipe2', 'sky'];
    // 小鸟对象
    this.roles = null;
    // 时间
    this.t = null;
  };
  Game.prototype = {
    constructor: Game,
    // 开始游戏方法
    startGame: function () {
      var that = this;
      Fly.loadImage(that.imgArr, function (imgObj) {
        // 创建游戏对象
        that.initRoles( imgObj );
        (function render() {
          // 当前时间
          that.currentFrameTime = new Date();
          that.t = that.currentFrameTime - that.lastFrameTime; // 两帧间隔时间
          that.lastFrameTime = that.currentFrameTime;
          that.ctx.clearRect(0, 0, that.cv.width, that.cv.height);
          that.ctx.beginPath();

          // 渲染游戏角色
          that.draw();

          if (that.isStart) {
            window.requestAnimationFrame(render);
          }
        })()
        // 绑定点击事件
        that.bindEvent();
      });
    },
    // 停止游戏方法
    stopGame: function () {
      this.isStart = false;
    },
    // 初始化游戏角色方法
    initRoles: function ( imgObj ) {
      // 创建小鸟对象
      this.roles = Fly.factory('Bird',{
        ctx: this.ctx,
        imgObj: imgObj.birds
      });

      // 添加观察者
      var that = this;
      this.roles.addListener(function () {
        that.stopGame();
      });

      // 创建天空对象
      for (var i = 0; i < 2; i++) {
        var sky = Fly.factory('Sky',{
          ctx: this.ctx,
          skyImgObj: imgObj.sky,
          sky_x: imgObj.sky.width * i
        });
        this.rolesList.push(sky);
      }

      // 创建管道对象
      for (var i = 0; i < 6; i++) {
        var pipe = Fly.factory('Pipe',{
          ctx: this.ctx,
          topImg: imgObj.pipe2,
          bottomImg: imgObj.pipe1,
          x: imgObj.pipe1.width * i * 3 + 300
        });
        this.rolesList.push(pipe);
      }

      // 创建陆地对象
      for (var i = 0; i < 4; i++) {
        var land = Fly.factory('Land',{
          ctx: this.ctx,
          img: imgObj.land,
          x: imgObj.land.width * i
        })
        this.rolesList.push(land);
      }
    },
    // 渲染游戏角色方法
    draw: function () {
      var that = this;
      // 调用天空的绘制方法
      this.rolesList.forEach(function (val) {
        val.render( that.t ); 
      });

      // 调用小鸟对象的渲染方法
      this.roles.render( that.t );
    },
    // 绑定事件方法
    bindEvent: function () {
      var that = this;
      // 给画布注册点击事件
      this.cv.addEventListener('click', function () {
        that.roles.changeSpeed(-0.3);
      });
    }

  };
  Fly.Game = Game;
})( Fly )