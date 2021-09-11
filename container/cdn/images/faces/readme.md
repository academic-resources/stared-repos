# Chrome & 新特性

> Shape Detection API

```sh

chrome://flags/#enable-experimental-web-platform-features

```
> 前端 人脸检测 

https://segmentfault.com/a/1190000010604276
https://segmentfault.com/a/1190000014603215


> 条形码：Barcode Detection (For Chrome 56+)

```js

var barcodeDetector = new BarcodeDetector();
barcodeDetector.detect(image)
  .then(barcodes => {
    barcodes.forEach(barcode => console.log(barcodes.rawValue))
  })
  .catch(err => console.error(err));
```

> 人脸：Face Detection (For Chrome 56+)

```js
var faceDetector = new FaceDetector();
faceDetector.detect(image)
  .then(faces => faces.forEach(face => console.log(face)))
  .catch(err => console.error(err));

```
> 文本：Text Detection (For Chrome 58+)

```js

var textDetector = new TextDetector();
textDetector.detect(image)
  .then(boundingBoxes => {
    for(let box of boundingBoxes) {
      speechSynthesis.speak(new SpeechSynthesisUtterance(box.rawValue));
    }
  })
  .catch(err => console.error(err));

```


![image](https://user-images.githubusercontent.com/7291672/45194500-eeb47b00-b285-11e8-9ee9-a717b0aeef57.png)

![image](https://user-images.githubusercontent.com/7291672/45194539-160b4800-b286-11e8-8ccc-475c9319dbed.png)





