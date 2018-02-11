// 全局对象fly & 工具函数
(function (window) {
  'use strict';

  var Fly = {};

  // 加载图片函数
  Fly.loadImage = function (list, callback) {
    var count = 0,
        imgArrLength = list.length,
        imgObj = {};

    list.forEach(function (val, index) {
      var img = new Image();
      img.src = 'images/' + val + '.png';

      imgObj[val] = img;

      img.onload = function () {
        count++;
        if (count === imgArrLength) {
          callback(imgObj);
        }
      }
    })
  };
  // 动态创建 canvas 标签
  Fly.creatCv = function ( id ) {
    var cv = document.createElement('canvas');
    cv.width = 800;
    cv.height = 600;

    var container = document.getElementById( id );
    container.appendChild( cv );

    return cv.getContext('2d');
  };
  // 工厂函数创建对象
  Fly.factory = function ( type , options ) {
    switch ( type ) {
      case 'Game':
        return new Fly.Game( options );
      case 'Bird':
        return new Fly.Bird(options);
      case 'Land':
        return new Fly.Land(options);
      case 'Pipe':
        return new Fly.Pipe(options);
      case 'Sky':
        return new Fly.Sky(options);
    }
  };

  // 转弧度
  Fly.toRadian = function (angle) {
    return angle / 180 * Math.PI;
  };

  window.Fly = Fly;
})(window)