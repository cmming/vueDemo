export function getLanguage() {
    //中文mac 下google浏览器显示的是en TODO 
    var JsSrc = (navigator.language || navigator.browserLanguage).toLowerCase();
    if (JsSrc.indexOf('zh') >= 0) {
        // 假如浏览器语言是中文
        return 'zh'
    } else if (JsSrc.indexOf('en') >= 0) {
        // 假如浏览器语言是英文
        return 'en'
    } else {
        return 'en'
    }
}

/**
 * 检查浏览器的版本
 */
export function checkBrowser() {
    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var ua = navigator.userAgent.toLowerCase();
    return {
        isOpera: isOpera,
        isFirefox: typeof InstallTrigger !== 'undefined',
        isSafari: (~ua.indexOf('safari') && !~ua.indexOf('chrome')) || Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
        isChrome: !!window.chrome && !isOpera,
        isIE: /*@cc_on!@*/ false || !!document.documentMode // At least IE6
    }
}

/**
 *检测浏览器是否支持文件夹的上传
 *
 * @export function
 * @returns boolean
 */
export function testWebkitdirectory() {
    var testWebkitdirectory = document.getElementById("testWebkitdirectory")
    if (testWebkitdirectory) {
        document.body.removeChild(testWebkitdirectory);
    }
    var dom = document.createElement('input');
    dom.id = "testWebkitdirectory";
    document.body.appendChild(dom);
    return document.getElementById('testWebkitdirectory').webkitdirectory === undefined ? false : true
}