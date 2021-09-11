title: 多说自定义CSS头像和多说评论显示UA
date: 2015-12-20 19:32:03
categories: Hexo
description: 感谢多说团队和那些无私的开发者们

---

![](http://i.v2ex.co/kNlD5E2c.png)

## 前言
多说是一款社会化评论系统，她改变了网站与用户之间，用户与用户之间的互动方式。当然Disqus在大家心目中可能更加具有影响力，而我选择多说的原因也很简单，一句话概括来说就是“接地气的本地化评论托管服务”。之前看到很多朋友自豪的使用WordPress时会选择多说作为第三方评论插件，民间的高手们也根据官方的API开发出一些十分有趣的隐藏属性。因为现在自己使用GitHub+Hexo搭建的静态Blog，也希望通过多说自定义CSS和多说评论显示User Agent让评论动感起来，文章记录了自己所执行的真实步骤，扩展阅读和原文中也会标注参考链接和注意点，Blog所需要修改后的文件都托管在GitHub上，欢迎大家分享自己的经验，我们一起完善这些简单而有趣的小功能。

>感谢多说团队和那些无私的开发者们

---

## 更新历史

2015年12月20日 - 修复移动端多说评论头像错位，完善细节内容，感谢[@橙子](http://orangeprogramming.com)
2015年11月29日 - 增加2个非本地化embedded.js让多说显示UA方案
2015年04月25日 - 修复Font Awesome图标显示，增加动态效果图展示
2015年04月24日 - 初稿

阅读原文 - http://wsgzao.github.io/post/duoshuo/

扩展阅读

- duoshuo-mod - https://github.com/wsgzao/duoshuo-mod
- 出色的自定义效果展示 - http://dev.duoshuo.com/docs/4ff1cfd0397309552c000017
- HelloDog Index - http://wsgzao.github.io/index/#Hexo

---

## 多说自定义CSS

>主要参考@V说，他的文章中还分享了额外9种特效，满足大家Duang的欲望哈

多说自定义CSS 让你的多说评论动感起来 - http://www.vsay.cn/one-more-custom-css-lets-you-say-comments-city.html

![](http://ww3.sinaimg.cn/large/7207510dgw1erhrcp15bzg20dj0bm7l2.gif)

### 头像水平翻转

``` css
/*Head Start*/
#ds-thread #ds-reset ul.ds-comments-tabs li.ds-tab a.ds-current {
    border: 0px;
    color: #6D6D6B;
    text-shadow: none;
    background: #F3F3F3;
}

#ds-thread #ds-reset .ds-highlight {
    font-family: Microsoft YaHei, "Helvetica Neue", Helvetica, Arial, Sans-serif;
    ;font-size: 100%;
    color: #6D6D6B !important;
}

#ds-thread #ds-reset ul.ds-comments-tabs li.ds-tab a.ds-current:hover {
    color: #696a52;
    background: #F2F2F2;
}

#ds-thread #ds-reset a.ds-highlight:hover {
    color: #696a52 !important;
}

#ds-thread {
    padding-left: 15px;
}

#ds-thread #ds-reset li.ds-post,#ds-thread #ds-reset #ds-hot-posts {
    overflow: visible;
}

#ds-thread #ds-reset .ds-post-self {
    padding: 10px 0 10px 10px;
}

#ds-thread #ds-reset li.ds-post,#ds-thread #ds-reset .ds-post-self {
    border: 0 !important;
}

#ds-reset .ds-avatar, #ds-thread #ds-reset ul.ds-children .ds-avatar {
    top: 15px;
    left: -20px;
    padding: 5px;
    width: 36px;
    height: 36px;
    box-shadow: -1px 0 1px rgba(0,0,0,.15) inset;
    border-radius: 46px;
    background: #FAFAFA;
}

#ds-thread .ds-avatar a {
    display: inline-block;
    padding: 1px;
    width: 32px;
    height: 32px;
    border: 1px solid #b9baa6;
    border-radius: 50%;
    background-color: #fff !important;
}

#ds-thread .ds-avatar a:hover {
}

#ds-thread .ds-avatar > img {
    margin: 2px 0 0 2px;
}

#ds-thread #ds-reset .ds-replybox {
    box-shadow: none;
}

#ds-thread #ds-reset ul.ds-children .ds-replybox.ds-inline-replybox a.ds-avatar,
#ds-reset .ds-replybox.ds-inline-replybox a.ds-avatar {
    left: 0;
    top: 0;
    padding: 0;
    width: 32px !important;
    height: 32px !important;
    background: none;
    box-shadow: none;
}

#ds-reset .ds-replybox.ds-inline-replybox a.ds-avatar img {
    width: 32px !important;
    height: 32px !important;
    border-radius: 50%;
}

#ds-reset .ds-replybox a.ds-avatar,
#ds-reset .ds-replybox .ds-avatar img {
    padding: 0;
    width: 32px !important;
    height: 32px !important;
    border-radius: 5px;
}

#ds-reset .ds-avatar img {
    width: 32px !important;
    height: 32px !important;
    border-radius: 32px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.22);
    -webkit-transition: .8s all ease-in-out;
    -moz-transition: .4s all ease-in-out;
    -o-transition: .4s all ease-in-out;
    -ms-transition: .4s all ease-in-out;
    transition: .4s all ease-in-out;
}

.ds-post-self:hover .ds-avatar img {
    -webkit-transform: rotateX(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
}

#ds-thread #ds-reset .ds-comment-body {
    -webkit-transition-delay: initial;
    -webkit-transition-duration: 0.4s;
    -webkit-transition-property: all;
    -webkit-transition-timing-function: initial;
    background: #F7F7F7;
    padding: 15px 15px 15px 47px;
    border-radius: 5px;
    box-shadow: #B8B9B9 0 1px 3px;
    border: white 1px solid;
}

#ds-thread #ds-reset ul.ds-children .ds-comment-body {
    padding-left: 15px;
}

#ds-thread #ds-reset .ds-comment-body p {
    color: #787968;
}

#ds-thread #ds-reset .ds-comments {
    border-bottom: 0px;
}

#ds-thread #ds-reset .ds-powered-by {
    display: none;
}

#ds-thread #ds-reset .ds-comments a.ds-user-name {
    font-weight: normal;
    color: #3D3D3D !important;
}

#ds-thread #ds-reset .ds-comments a.ds-user-name:hover {
    color: #D32 !important;
}

#ds-thread #ds-reset #ds-bubble {
    display: none !important;
}

#ds-thread #ds-reset #ds-hot-posts {
    border: 0;
}

#ds-reset #ds-hot-posts .ds-gradient-bg {
    background: none;
}

#ds-thread #ds-reset .ds-comment-body:hover {
    background-color: #F1F1F1;
    -webkit-transition-delay: initial;
    -webkit-transition-duration: 0.4s;
    -webkit-transition-property: all;
    -webkit-transition-timing-function: initial;
}
/*Head End*/
```

### 多说后台自定义CSS

>设置步骤超级简单，登录多说后台->设置->基本设置->自定义CSS

![](http://ww1.sinaimg.cn/large/7207510dgw1ergrzty3c5j20mm0i4dj7.jpg)

## 多说评论显示UA(User Agent)

>以前参考@myhloli和@搜索客，目前已经独立拆分代码便于长期维护

多说评论框UA显示/博主标记 - http://myhloli.com/duoshuo-ua-and-admin-tab.html

多说回复后显示浏览器及操作系统信息（Useragent） - http://ssk.91txh.com/209

### 本地化embed.js

1.下载embed.js

多说官方 - http://static.duoshuo.com/embed.js

偷懒可以下载我当前使用的 - http://wsgzao.github.io/embed_ua.js

2.获取多说ID

方法一：在文章下方登录后评论点击头像可获取多说ID

方法二：访问多说后台，http://duoshuo.com/settings/ ，点击你的用户名，地址栏中会出现如如下的ID地址
http://duoshuo.com/profile/867394/

3.本地修改embed.js

>注意修改e.user_id多说ID，可以自定义ssk前端显示昵称

``` js
//HelloDog -  http://wsgzao.github.io/post/duoshuo/
//Mobile Start
function checkMobile() {
    var isiPad = navigator.userAgent.match(/iPad/i) != null;
    if (isiPad) {
        return false;
    }
    var isMobile = navigator.userAgent.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i) != null;
    if (isMobile) {
        return true;
    }
    return false;
}
//Mobile End
//Admin Start
function sskadmin(e) {
    var ssk = '';
    if (e.user_id == 867394) {
        if (checkMobile()) {
            ssk = '<span class="this_ua sskadmin">R00T</span><br><br>';
        } else {
            ssk = '<span class="this_ua sskadmin">R00T</span>';
        }
    } else {
        if (checkMobile()) {
            ssk = '<br><br>';
        }
    }
    return ssk;
}
//Admin End
//UA Start
 function show_ua(string){
        console.log(string)
        $.ua.set(string);
        var sua=$.ua;
        if(sua.os.version=='x86_64')sua.os.version='x64';
        if (checkMobile()) {
        return '<span class="this_ua platform '+sua.os.name+'">'+sua.os.name+' '+sua.os.version+'</span><br><br><span class="this_ua browser '+sua.browser.name+'">'+sua.browser.name+' '+sua.browser.version+'</span>';
        } else { 
        return '<span class="this_ua platform '+sua.os.name+'">'+sua.os.name+' '+sua.os.version+'</span><span class="this_ua browser '+sua.browser.name+'">'+sua.browser.name+' '+sua.browser.version+'</span>';
        }
    }
//UA End
```

4.上传embed.js

我的做法上传到GitHub，其它类似七牛或者云主机的方法都可以
http://wsgzao.github.io/embed_ua.js

5.修改多说调用地址

>其它平台以此类推，我自己的做法ds.src = '//wsgzao.github.io/embed_ua.js';

``` js
<script type="text/javascript">
  var duoshuoQuery = {short_name:"<%= theme.duoshuo_shortname %>"};
  (function() {
    var ds = document.createElement('script');
    ds.type = 'text/javascript';ds.async = true;
    ds.src = '//wsgzao.github.io/embed_ua.js';
    ds.charset = 'UTF-8';
    (document.getElementsByTagName('head')[0]
    || document.getElementsByTagName('body')[0]).appendChild(ds);
  })();
</script>
```

7.多说后台自定义CSS

>请参考上文方法加入多说自定义CSS

``` css
/*UA Start*/
span.this_ua {
    background-color: #ccc!important;
    border-radius: 4px;
    padding: 0 5px!important;
    margin: 0 1px!important;
    border: 1px solid #BBB!important;
    color: #fff;

    /*text-transform: Capitalize!important;
    float: right!important;
    line-height: 18px!important;*/
}
.this_ua.platform.Windows{
    background-color: #39b3d7!important;
    border-color: #46b8da!important;
}
.this_ua.platform.Linux {
    background-color: #3A3A3A!important;
    border-color: #1F1F1F!important;
}
.this_ua.platform.Ubuntu {
    background-color: #DD4814!important;
    border-color: #DD4814!important;
}
.this_ua.platform.Mac {
    background-color: #666666!important;
    border-color: #666666!important;
}
.this_ua.platform.Android {
    background-color: #98C13D!important;
    border-color: #98C13D!important;
}
.this_ua.platform.iOS {
    background-color: #666666!important;
    border-color: #666666!important;
}
.this_ua.browser.Chrome{
    background-color: #EE6252!important;
    border-color: #EE6252!important;
}
.this_ua.browser.Chromium{
    background-color: #EE6252!important;
    border-color: #EE6252!important;
}
.this_ua.browser.Firefox{
    background-color: #f0ad4e!important;
    border-color: #eea236!important;
}
.this_ua.browser.IE{
    background-color: #428bca!important;
    border-color: #357ebd!important;
}
.this_ua.browser.Edge{
    background-color: #428bca!important;
    border-color: #357ebd!important;
}
.this_ua.browser.Opera{
    background-color: #d9534f!important;
    border-color: #d43f3a!important;
}
.this_ua.browser.Maxthon{
    background-color: #7373B9!important;
    border-color: #7373B9!important;
}
.this_ua.browser.Safari{
    background-color: #666666!important;
    border-color: #666666!important;
}
.this_ua.sskadmin {
    background-color: #00a67c!important;
    border-color: #00a67c!important;
}
/*UA End*/
/*Head Start*/
#ds-thread #ds-reset ul.ds-comments-tabs li.ds-tab a.ds-current {
    border: 0px;
    color: #6D6D6B;
    text-shadow: none;
    background: #F3F3F3;
}

#ds-thread #ds-reset .ds-highlight {
    font-family: Microsoft YaHei, "Helvetica Neue", Helvetica, Arial, Sans-serif;
    ;font-size: 100%;
    color: #6D6D6B !important;
}

#ds-thread #ds-reset ul.ds-comments-tabs li.ds-tab a.ds-current:hover {
    color: #696a52;
    background: #F2F2F2;
}

#ds-thread #ds-reset a.ds-highlight:hover {
    color: #696a52 !important;
}

#ds-thread {
    padding-left: 15px;
}

#ds-thread #ds-reset li.ds-post,#ds-thread #ds-reset #ds-hot-posts {
    overflow: visible;
}

#ds-thread #ds-reset .ds-post-self {
    padding: 10px 0 10px 10px;
}

#ds-thread #ds-reset li.ds-post,#ds-thread #ds-reset .ds-post-self {
    border: 0 !important;
}

#ds-reset .ds-avatar, #ds-thread #ds-reset ul.ds-children .ds-avatar {
    top: 15px;
    left: -20px;
    padding: 5px;
    width: 36px;
    height: 36px;
    box-shadow: -1px 0 1px rgba(0,0,0,.15) inset;
    border-radius: 46px;
    background: #FAFAFA;
}

#ds-thread .ds-avatar a {
    display: inline-block;
    padding: 1px;
    width: 32px;
    height: 32px;
    border: 1px solid #b9baa6;
    border-radius: 50%;
    background-color: #fff !important;
}

#ds-thread .ds-avatar a:hover {
}

#ds-thread .ds-avatar > img {
    margin: 2px 0 0 2px;
}

#ds-thread #ds-reset .ds-replybox {
    box-shadow: none;
}

#ds-thread #ds-reset ul.ds-children .ds-replybox.ds-inline-replybox a.ds-avatar,
#ds-reset .ds-replybox.ds-inline-replybox a.ds-avatar {
    left: 0;
    top: 0;
    padding: 0;
    width: 32px !important;
    height: 32px !important;
    background: none;
    box-shadow: none;
}

#ds-reset .ds-replybox.ds-inline-replybox a.ds-avatar img {
    width: 32px !important;
    height: 32px !important;
    border-radius: 50%;
}

#ds-reset .ds-replybox a.ds-avatar,
#ds-reset .ds-replybox .ds-avatar img {
    padding: 0;
    width: 32px !important;
    height: 32px !important;
    border-radius: 5px;
}

#ds-reset .ds-avatar img {
    width: 32px !important;
    height: 32px !important;
    border-radius: 32px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.22);
    -webkit-transition: .8s all ease-in-out;
    -moz-transition: .4s all ease-in-out;
    -o-transition: .4s all ease-in-out;
    -ms-transition: .4s all ease-in-out;
    transition: .4s all ease-in-out;
}

.ds-post-self:hover .ds-avatar img {
    -webkit-transform: rotateX(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
}

#ds-thread #ds-reset .ds-comment-body {
    -webkit-transition-delay: initial;
    -webkit-transition-duration: 0.4s;
    -webkit-transition-property: all;
    -webkit-transition-timing-function: initial;
    background: #F7F7F7;
    padding: 15px 15px 15px 47px;
    border-radius: 5px;
    box-shadow: #B8B9B9 0 1px 3px;
    border: white 1px solid;
}

#ds-thread #ds-reset ul.ds-children .ds-comment-body {
    padding-left: 15px;
}

#ds-thread #ds-reset .ds-comment-body p {
    color: #787968;
}

#ds-thread #ds-reset .ds-comments {
    border-bottom: 0px;
}

#ds-thread #ds-reset .ds-powered-by {
    display: none;
}

#ds-thread #ds-reset .ds-comments a.ds-user-name {
    font-weight: normal;
    color: #3D3D3D !important;
}

#ds-thread #ds-reset .ds-comments a.ds-user-name:hover {
    color: #D32 !important;
}

#ds-thread #ds-reset #ds-bubble {
    display: none !important;
}

#ds-thread #ds-reset #ds-hot-posts {
    border: 0;
}

#ds-reset #ds-hot-posts .ds-gradient-bg {
    background: none;
}

#ds-thread #ds-reset .ds-comment-body:hover {
    background-color: #F1F1F1;
    -webkit-transition-delay: initial;
    -webkit-transition-duration: 0.4s;
    -webkit-transition-property: all;
    -webkit-transition-timing-function: initial;
}
/*Head End*/
```

## 其它开源方案

>欢迎大家积极反馈，提出自己的想法^_^

[多说]不本地化embed.js使多说评论显示UA - http://easun.org/blog/archives/make_duoshuo_show_ua.html

多说UA插件 - http://gerald.top/code/duoshuo-ua

ua-parser-js - https://github.com/faisalman/ua-parser-js

duoshuo-mod - https://github.com/wsgzao/duoshuo-mod

### 前端识别

>大家可以猛击测试各种UA

Useragent.js - http://zsxsoft.github.io/useragent.js/withimage.html

UAParser.js - http://faisalman.github.io/ua-parser-js/
