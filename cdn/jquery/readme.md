#  jQuery 与其他框架/库的混合使用，$ 符号产生的冲突的避免方式：

## 《1》jQuery 在其他库之后导入

### 1
    //将变量$的控制权，让渡给prototype.js(一种js框架/库)
    jQuery.noConflict();
    //使用 jQuery(), 代替$()方法
    jQuery(function(){
    	//do some things
    });
### 2
    // 自定义一个快捷方式：
    var $x = jQuery.noConflict();
    $x (function(){
        //do some things
        //函数内部使用$x()方法,代替$()方法
    })
### 3
    //将变量$的控制权，让渡给prototype.js(一种js框架/库)
    jQuery.noConflict();
    //使用 jQuery设置页面加载时的执行函数
    jQuery(function($){
    	//do some things
    	//函数内部正常使用$()方法
    });
### 4
    /*
    	最理想的方式，通过改变少量的代码，实现最全面的兼容性！
    */
    //将变量$的控制权，让渡给prototype.js(一种js框架/库)
    jQuery.noConflict();
    //定义匿名函数，并设置形参为$
    //匿名函数内部的$ == jQuery
    (function($){
    	$(function(){
    		//do some things
    		//可以正常使用$()方法
    	});
    })(jQuery);
    //执行匿名函数，且传递实参jQuery

## 《2》jQuery 在其他库之前导入

### 5
    //不需要调用jQuery.noConflict(); 
    //可以使用$()方法作为其他框架/库的快捷方式
    //直接使用 jQuery(), 代替$()方法
    jQuery(function(){
    	//do some things
    	//使用 jQuery(), 代替$()方法
    });
