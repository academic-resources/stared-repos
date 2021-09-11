"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2020-07-23
 * @modified
 *
 * @description
 * @difficulty Easy Medium Hard
 * @complexity O(n)
 * @augments
 * @example
 * @link
 * @solutions
 *
 */

const log = console.log;

var video = document.querySelector('video');
var audio = document.querySelector('audio');
var canvas = document.querySelectorAll('canvas')[0];
var canvasForDiff = document.querySelectorAll('canvas')[1];

navigator.getMedia = (
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia
);

// video捕获摄像头画面
navigator.getMedia({
  video: true,
}, async function (stream) {
    const mediaStream = await navigator.mediaDevices.getUserMedia({video: true});
    video.srcObject = mediaStream;
    video.play();
    video.onplay = function () {
      // showVideo();
    };
}, error);

// navigator.webkitGetUserMedia({
//   video: true
// }, success, error);

// function success(stream) {
//   video.src = window.URL.createObjectURL(stream);
//   video.play();
// }


function error(err) {
  alert('video error: ' + err)
}

//canvas
var context = canvas.getContext('2d');
let diffCtx = canvasForDiff.getContext('2d');

//将第二个画布混合模式设为“差异”
diffCtx.globalCompositeOperation = 'difference';

let preFrame;//前一帧

let curFrame;//当前帧

var diffFrame;//存放差异帧的imageData

//捕获并保存帧内容
function captureAndSaveFrame(){
  preFrame = curFrame;
  context.drawImage(video, 0, 0, 640, 480);
  curFrame = canvas.toDataURL();  //转为base64并保存
}

//绘制base64图像到画布上
function drawImg(src, ctx){
  ctx = ctx || diffCtx;
  var img = new Image();
  img.src = src;
  ctx.drawImage(img, 0, 0, 640, 480);
}

//渲染前后两帧差异
function renderDiff(){
  diffCtx.clearRect(0, 0, 640, 480);
  drawImg(preFrame);
  drawImg(curFrame);
  diffFrame = diffCtx.getImageData( 0, 0, 640, 480 );  //捕获差异帧的imageData对象
}

//计算差异
function calcDiff(){
  if(!diffFrame) return 0;
  var cache = arguments.callee,
      count = 0;
  cache.total = cache.total || 0; //整个画布都是白色时所有像素的值的总和
  for (var i = 0, l = diffFrame.width * diffFrame.height * 4; i < l; i += 4) {
      count += diffFrame.data[i] + diffFrame.data[i + 1] + diffFrame.data[i + 2];
      if(!cache.isLoopEver){  //只需在第一次循环里执行
          cache.total += 255 * 3;   //单个白色像素值
      }
  }
  cache.isLoopEver = true;
  count *= 3;  //亮度放大
  //返回“差异画布高亮部分像素总值”占“画布全亮情况像素总值”的比例
  return Number(count/cache.total).toFixed(2);
}

//播放音频
function fireAlarm(){
  audio.play();
}


//定时捕获
function timer(delta){
  setTimeout(function(){
      captureAndSaveFrame();
      if(preFrame && curFrame){
          renderDiff();
          if(calcDiff() > 0.2){  //监控到异常
            //发日记
            submit();
            //播放音频告警
            fireAlarm();
          }
      }
      timer(delta)
  }, delta || 500);
}

setTimeout(timer, 60000 * 10);
//设定打开页面十分钟后才开始监控


//异常图片上传处理
function submit(){
    let cache = arguments.callee;
    let now = Date.now();
    if(cache.reqTime && (now - cache.reqTime < 5000)) {
      return;
      //日记创建最小间隔为5秒
    }
    cache.reqTime = now;
    //ajax 提交form
    const data = {
      '__VIEWSTATE': '',
      '__VIEWSTATEGENERATOR': '4773056F',
      'Editor$Edit$txbTitle': '告警' + Date.now(),
      'Editor$Edit$EditorBody': '<img src="' + curFrame + '" />',
      'Editor$Edit$lkbPost': '保存'
    };
    fetch(`http://i.cnblogs.com/EditDiary.aspx?opt=1`, {
      method: "POST",
      // cors: "no",
      credentials: "include",
      // timeout : 5000,
    })
    .then(res => res.json())
    .then(json => {
      console.log('submit done')
    })
    .catch(err => {
      cache.reqTime = 0;
      log(`error`, err);
    });
    // $.ajax({
    //   url : 'http://i.cnblogs.com/EditDiary.aspx?opt=1',
    //   type : "POST",
    //   timeout : 5000,
    //   data : {
    //     '__VIEWSTATE': '',
    //     '__VIEWSTATEGENERATOR': '4773056F',
    //     'Editor$Edit$txbTitle': '告警' + Date.now(),
    //     'Editor$Edit$EditorBody': '<img src="' + curFrame + '" />',
    //     'Editor$Edit$lkbPost': '保存'
    //   },
    //   success: function(){
    //     console.log('submit done')
    //   },
    //   error: function(err){
    //     cache.reqTime = 0;
    //     console.log('error: ' + err)
    //   }
    // });
}





/*

// Request the camera.
navigator.getMedia(
  {
    video: true
  },
  // Success Callback
  async function (stream) {
    const mediaStream = await navigator.mediaDevices.getUserMedia({video: true});
    log(`stream`, typeof stream, stream);
    // const mediaStream = new MediaStream();
    // video.src = URL.createObjectURL(mediaStream);
    // Uncaught (in promise) DOMException: Failed to load because no supported source was found.
    // video.src = stream;
    // const mediaStream = new MediaStream(stream);
    // const mediaStream = new MediaStream();
    video.srcObject = mediaStream;
    // video.srcObject = stream;
    // Create an object URL for the video stream and set it as src of our HTLM video element.
    // video.src = URL.createObjectURL(stream);
    // Play the video element to start the stream.
    video.play();
    video.onplay = function () {
      showVideo();
    };
  },
  // Error Callback
  function (err) {
    displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
  }
);

 */
