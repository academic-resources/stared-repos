/**
 * @description 屏幕检测工具
 * @author ericxia
 * @class ScreenChecker
 * @created 2020.12.23
 * @modified 2021.02.23
 */
class ScreenChecker {
    constructor () {
        this.screen = window.screen;
        this.fullscreen = false;
        this.screenSize = {
            width: 0,
            height: 0,
        };
        this.init();
    }
    getScreenSize () {
        const {
            height,
            width,
        } = this.screen;
        this.screenSize = {
            width,
            height,
        };
        return {
            width,
            height,
        };
    }
    isFullScreen () {
        // 全屏判断逻辑，可用的屏幕大小等于实际的屏幕大小, 浏览器地址栏高度为 0
        // availLeft, availTop, 👎 不推荐使用
        const {
            availHeight,
            availWidth,
            height,
            width,
        } = this.screen;
        this.fullscreen = (availHeight === height && availWidth === width);
        return this.fullscreen;
    }
    getDepth () {
        const {
            colorDepth,
            pixelDepth,
        } = this.screen;
        return {
            colorDepth,
            pixelDepth,
        };
    }
    isScreenResized () {
        // TODO: 屏幕缩放检测
        return false;
    }
    getOrientation () {
        // 屏幕方向，判断屏幕是否旋转
        const {
            orientation: {
                angle,
                type,
                // onchange,
            },
        } = this.screen;
        return {
            angle,
            type,
        };
    }
    // static 里面不能使用 this, 仅用于 pure function， utils
    init () {
        this.getScreenSize();
        this.isFullScreen();
    }
    getAll () {
        return {
            screen: this.screen,
            fullscreen: this.fullscreen,
            screenSize: this.screenSize,
        };
    }
}

// export {
//     ScreenChecker,
// };

// export default ScreenChecker;


