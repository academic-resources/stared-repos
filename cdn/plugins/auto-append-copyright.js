
"use strict";

/**
 * 
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2021-05-29
 * @modified 
 * 
 * @description js auto append copyright info, after copy text
 * @augments 
 * @example 
 * @link https://www.cnblogs.com/xgqfrms/p/14822088.html
 * @link https://www.cnblogs.com/xgqfrms/p/14824957.html
 * 
 */

// js 自动添加 copyright©️版权所有声明信息
document.body.oncopy = event => {
    const log = console.log;
    log('js 自动添加 copyright©️版权所有声明信息 ✅');
    event.preventDefault(); 
        // 阻止默认事件 
    const copyTexts = window.getSelection(0).toString();
    // 保存复制文字
    let copyrightTexts = ``;
    // 复制很少的文字则不添加版权信息，超过一定长度的文字就添加版权信息
    if (copyTexts.length > 7) {
        copyrightTexts = `
${copyTexts}
作者：xgqfrms
链接：${window.location.href ?? 'https://www.cnblogs.com/xgqfrms/'}
来源：${window.location.origin}
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
            ©xgqfrms 2012-2021
${window.location.host} 发布文章使用：只允许注册用户才可以访问！
     原创文章，版权所有©️xgqfrms, 禁止转载 🈲️，侵权必究⚠️！
      `;
    } else {
        copyrightTexts = copyTexts; 
        // 没超过7个字 则采用被复制的内容。
    }
    if (event.clipboardData) {
        return event.clipboardData.setData('text', copyrightTexts); 
        // 写入粘贴板
    } else {
        // 兼容 IE
        return window.clipboardData.setData("text", copyrightTexts);
    }
}
