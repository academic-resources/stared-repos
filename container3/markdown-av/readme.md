# markdown-av

add audio and video tag support to markdown.  

## usage

in your markdown, you can use refs to audio and video assets, same as an image:

```markdown
![img tag](some-image.png)
![audio tag](some-audio.ogg)
![video tag](some-video.mp4)
```

then in your parser code:

```js
var mdav = require('markdown-av')
var html = mdav('# presenting \n ![bideo](movie.mp4)')
document.body.innerHTML = html
```
