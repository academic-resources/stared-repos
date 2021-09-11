// https://cdn.xgqfrms.xyz/svg/zrender/zrender.min.js

window.onload = () => {
  const default_pts = {
    renderer: 'canavs',// 渲染方式，支持：'canavs'、'svg'、'vml'
    devicePixelRatio: 2, // 画布大小与容器大小之比，仅当 renderer 为 'canvas' 时有效。
    width: 'auto',// 画布宽度，设为 'auto' 则根据 devicePixelRatio 与容器宽度自动计算。
    height: 'auto', // 画布高度，设为 'auto' 则根据 devicePixelRatio 与容器高度自动计算。
  };
  const opts = {
    renderer: 'svg',
    width: 200,
    height: 200,// 画布大小 
  };
  const zr = zrender.init(document.getElementById('app'), opts);
  // console.log(`zr`, zr);
  const version = zrender.version;
  console.log(`zr version`, version);
  // version 4.1.2

  const circle = new zrender.Circle({
      shape: {
          cx: 150,
          cy: 50,
          r: 40,
      },
      style: {
          fill: '#0f0',
          // fill: 'none',
          stroke: '#F00',
      },
  });
  // animation
  let w = zr.getWidth();
  let h = zr.getHeight();
  let r = 30;
  circle
  .animate('shape', true)
  .when(5000, {
    cx: w - r,
  })
  .when(10000, {
    cx: r,
  })
  .start();

  zr.add(circle);
  
  console.log(`circle.shape`, circle.shape);
  // circle.shape {cx: 150, cy: 50, r: 40}
  // console.log(circle.shape.r);
  // 40
  setTimeout(() => {
    circle.attr('shape', {
        r: 50,
        // 只更新 r; cx、cy 将保持不变;
    });
  }, 3000);
};