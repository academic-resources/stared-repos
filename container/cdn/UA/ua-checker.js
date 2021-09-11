// import ScreenChecker from './screenChecker';

const screenSize = new ScreenChecker().getScreenSize();

/**
 * @description UserAgent 检测工具
 * @author ericxia
 * @class UAChecker
 * @created 2020.12.23
 * @modified 2021.04.11
 */
class UAChecker {
    constructor (ua = '') {
        if(ua !== '') {
            this.ua = ua.toLocaleLowerCase();
        } else {
            this.ua = navigator.userAgent.toLocaleLowerCase();
            // this.ua = "Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1".toLocaleLowerCase();
        }
        // this.userAgent = "Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1";
        this.userAgent = navigator.userAgent;
        this.os = 'unknown';
        this.osVersion = 'unknown';
        this.platform = 'unknown';
        this.engine = 'unknown';
        this.browser = 'unknown';
        this.browserVersion = 'unknown';
        this.screenSize = screenSize;
        this.init();
    }
    static regexTester (regex, ua) {
        return regex.test(ua);
    }
    static versionTester (regex, ua) {
        return (ua.match(regex) + '').replace(/[^0-9|_.]/g, '').replace(/_/g, '.');
    }
    getOS () {
        // 获取系统
        if (UAChecker.regexTester(/windows|win32|win64|wow32|wow64/g, this.ua)) {
            this.os = 'Windows';
        } else if (UAChecker.regexTester(/macintosh|macintel/g, this.ua)) {
            // apple m1 ???
            this.os = 'macOS';
        } else if (UAChecker.regexTester(/x11/g, this.ua)) {
            // linux 系统, unbuntu, fedora, redhat ...
            this.os = 'Linux';
        } else if (UAChecker.regexTester(/android|adr/g, this.ua)) {
            this.os = 'Android';
        } else if (UAChecker.regexTester(/ios|iphone|ipod/g, this.ua)) {
            this.os = 'iOS';
        }
        if (UAChecker.regexTester(/ipad/g, this.ua)) {
            this.os = 'iPadOS';
        }
        if (UAChecker.regexTester(/iwatch/g, this.ua)) {
            this.os = 'watchOS';
        }
        console.log('iOS', UAChecker.regexTester(/ios|iphone|ipod/g, this.ua));
        console.log('iPadOS', UAChecker.regexTester(/ipad/g, this.ua));
        console.log('this.ua', this.ua, this.os);
        return this.os;
    }
    getOSVersion () {
        // 获取系统版本
        if(this.os === 'unknown') {
            this.getOS();
        }
        switch (this.os) {
            case 'Windows':
                if (UAChecker.versionTester(/windows nt 5.0|windows 2000/g, this.ua)) {
                    this.osVersion = '2000';
                } else if (UAChecker.versionTester(/windows nt 5.1|windows xp/g, this.ua)) {
                    this.osVersion = 'Windows XP';
                } else if (UAChecker.versionTester(/windows nt 5.2|windows 2003/g, this.ua)) {
                    this.osVersion = 'Windows 2003';
                } else if (UAChecker.versionTester(/windows nt 6.0|windows vista/g, this.ua)) {
                    this.osVersion = 'Windows Vista';
                } else if (UAChecker.versionTester(/windows nt 6.1|windows 7/g, this.ua)) {
                    this.osVersion = 'Windows 7';
                } else if (UAChecker.versionTester(/windows nt 6.2|windows 8/g, this.ua)) {
                    this.osVersion = 'Windows 8';
                } else if (UAChecker.versionTester(/windows nt 6.3|windows 8.1/g, this.ua)) {
                    this.osVersion = 'Windows 8.1';
                } else if (UAChecker.versionTester(/windows nt 10.0|windows 10/g, this.ua)) {
                    this.osVersion = 'Windows 10';
                } else {
                    this.osVersion = 'Windows Next';
                }
                break;
            case 'macOS':
                this.osVersion = UAChecker.versionTester(/os x [\d._]+/g, this.ua);
                break;
            case 'Android':
                this.osVersion = UAChecker.versionTester(/android [\d._]+/g, this.ua);
                break;
            case 'iOS':
                this.osVersion = UAChecker.versionTester(/os [\d._]+/g, this.ua);
                break;
            case 'iPadOS':
                this.osVersion = UAChecker.versionTester(/os [\d._]+/g, this.ua);
                break;
            case 'Linux':
                this.osVersion = 'Linux';
                if(this.ua.match(/x11; [\w.]+;/g)) {
                    const version = this.ua.match(/x11; [\w.]+;/g)[0].replace(/x11; /, '').replace(/;/, '');
                    this.osVersion = `Linux ${version[0].toUpperCase()}${version.slice(1)}`;
                }
                break;
            default:
                break;
        }
        return this.osVersion;
    }
    getPlatform () {
        // 获取平台
        const OS = this.os !== 'unknown' ? this.os : this.getOS();
        if (OS === 'Windows' || OS === 'macOS' || OS === 'Linux') {
            // 桌面端
            this.platform = 'Desktop';
        } else if (OS === 'Android' || OS === 'iOS' || UAChecker.regexTester(/mobile/g, this.ua)) {
            // 移动端
            this.platform = 'Mobile';
        }
        return this.platform;
    }
    getBrowser () {
        // 获取浏览器
        if (UAChecker.regexTester(/applewebkit/g, this.ua)) {
            // webkit 内核
            if(UAChecker.regexTester(/blink/g, this.ua)) {
                this.engine = 'Blink';
            } else {
                this.engine = 'WebKit';
            }
            if (UAChecker.regexTester(/chrome/g, this.ua) || UAChecker.regexTester(/crios/g, this.ua)) {
                this.browser = 'Chrome';
            }
            if (UAChecker.regexTester(/safari/g, this.ua) && !UAChecker.regexTester(/chrome/g, this.ua) && !UAChecker.regexTester(/crios/g, this.ua)) {
                this.browser = 'Safari';
            }
            if (UAChecker.regexTester(/edg/g, this.ua)) {
                this.browser = 'Edge';
            }
            if(UAChecker.regexTester(/opr/g, this.ua)) {
                this.browser = 'Opera';
            }
            if(UAChecker.regexTester(/micromessenger/g, this.ua)) {
                this.browser = '微信浏览器';
            }
            if (UAChecker.regexTester(/qqbrowser/g, this.ua)) {
                this.browser = 'QQ 浏览器';
            }
            if (UAChecker.regexTester(/ubrowser/g, this.ua)) {
                this.browser  = 'UC 浏览器';
            }
            if (UAChecker.regexTester(/2345explorer/g, this.ua)) {
                this.browser  = '2345 浏览器';
            }
            if (UAChecker.regexTester(/metasr/g, this.ua)) {
                this.browser = '搜狗浏览器';
            }
            if (UAChecker.regexTester(/lbbrowser/g, this.ua)) {
                this.browser = '猎豹浏览器';
            }
            if (UAChecker.regexTester(/maxthon/g, this.ua)) {
                this.browser = '遨游浏览器';
            }
            if (UAChecker.regexTester(/dingtalk/g, this.ua)) {
                this.browser = '钉钉浏览器';
            }
            if (UAChecker.regexTester(/lark/g, this.ua)) {
                this.browser = '飞书浏览器';
            }
            if (UAChecker.regexTester(/miuibrowser/g, this.ua)) {
                this.browser = '小米浏览器';
            }
        } else if (UAChecker.regexTester(/gecko/g, this.ua) && UAChecker.regexTester(/firefox/g, this.ua)) {
            // gecko 内核
            this.engine = 'Gecko';
            this.browser = 'Firefox';
        } else if (UAChecker.regexTester(/trident|compatible|msie/g, this.ua)) {
            // trident 内核
            this.engine = 'Trident';
            this.browser = 'IE';
        } else if (UAChecker.regexTester(/opr/g, this.ua) || UAChecker.regexTester(/presto/g, this.ua)) {
            // presto 内核
            this.engine = 'presto';
            this.browser = 'Opera';
        } else {
            this.browser = 'unknown 浏览器';
        }
        return this.browser;
    }
    getBrowserVersion () {
        // 获取浏览器版本
        const browser = this.browser !== 'unknown' ? this.browser : this.getBrowser();
        switch (browser) {
            case 'Chrome':
                this.browserVersion = UAChecker.versionTester(/chrome\/[\d._]+/g, this.ua);
                if(UAChecker.regexTester(/crios/g, this.ua)) {
                    this.browserVersion = UAChecker.versionTester(/crios\/[\d._]+/g, this.ua);
                }
                break;
            case 'Safari':
                this.browserVersion = UAChecker.versionTester(/safari\/[\d._]+/g, this.ua);
                break;
            case 'Edge':
                this.browserVersion = UAChecker.versionTester(/edg?\/[\d._]+/g, this.ua);
                break;
            case 'Opera':
                this.browserVersion = UAChecker.versionTester(/opr\/[\d._]+/g, this.ua);
                break;
            case 'Firefox':
                this.browserVersion = UAChecker.versionTester(/firefox\/[\d._]+/g, this.ua);
                break;
            case 'IE':
                this.browserVersion = UAChecker.versionTester(/trident|compatible|msie\/[\d._]+/g, this.ua);
                break;
            case '百度浏览器':
                this.browserVersion = UAChecker.versionTester(/bidubrowser\/[\d._]+/g, this.ua);
                break;
            case '微信浏览器':
                this.browserVersion = UAChecker.versionTester(/micromessenger\/[\d._]+/g, this.ua);
                break;
            case 'QQ 浏览器':
                this.browserVersion = UAChecker.versionTester(/qqbrowser\/[\d._]+/g, this.ua);
                break;
            case '搜狗浏览器':
                this.browserVersion = UAChecker.versionTester(/metasr\/[\d._]+/g, this.ua);
                break;
            case '猎豹浏览器':
                this.browserVersion = UAChecker.versionTester(/lbbrowser\/[\d._]+/g, this.ua);
                break;
            case '遨游浏览器':
                this.browserVersion = UAChecker.versionTester(/maxthon\/[\d._]+/g, this.ua);
                break;
            case '2345 浏览器':
                this.browserVersion = UAChecker.versionTester(/2345explorer\/[\d._]+/g, this.ua);
                break;
            case 'UC 浏览器':
                this.browserVersion = UAChecker.versionTester(/ubrowser\/[\d._]+/g, this.ua);
                break;
            case '飞书浏览器':
                this.browserVersion = UAChecker.versionTester(/lark\/[\d._]+/g, this.ua);
                break;
            case '钉钉浏览器':
                this.browserVersion = UAChecker.versionTester(/dingtalk\/[\d._]+/g, this.ua);
                break;
            case '小米浏览器':
                this.browserVersion = UAChecker.versionTester(/miuibrowser\/[\d._]+/g, this.ua);
                break;
            default:
                // others
                this.browserVersion = 'unkown 浏览器版本';
                break;
        }
        return this.browserVersion;
    }
    getBrowserEngine () {
        // 获取浏览器引擎
        if(this.engine === 'unknown') {
            this.getBrowser();
        }
        return this.engine;
    }
    init () {
        this.getOS();
        this.getOSVersion();
        this.getPlatform();
        this.getBrowser();
        this.getBrowserVersion();
    }
    getAll () {
        return {
            os: this.os,
            osVersion: this.osVersion,
            browser: this.browser,
            browserVersion: this.browserVersion,
            engine: this.engine,
            platform: this.platform,
            ua: this.userAgent,
            // ua: this.ua,
            // userAgent: this.userAgent,
            screenSize: this.screenSize,
        };
    }
}

// export {
//     UAChecker,
// };

// export default UAChecker;
