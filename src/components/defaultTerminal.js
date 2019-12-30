/***
 * 判断终端环境
 */
const ua = window.navigator.userAgent;
const isWeixin = /MicroMessenger/i.test(ua);
const isAndroid = /Android/i.test(ua);
const isIOS = /iP[hone|ad|od] OS/i.test(ua);
const isIphone = /iPhone/i.test(ua);
const isIPad = /iPad/i.test(ua);
const canUse = isWeixin || isAndroid || isIOS || isIphone || isIPad; // 页面是否可用

// iphoneX iphoneXS 刘海高度 30px
const isIphoneX = !!(isIphone && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812);

// 刘海高度： 44px
const isIphoneXSMAX = !!(isIphone && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896);

// 刘海高度 33px
const isIphoneXR = !!(isIphone && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896);

// iPhoneX版本以上的刘海屏
const isIphoneXup = isIphoneX && isIphoneXSMAX && isIphoneXR;


//设置生产环境禁止浏览器打开 / 设置网页调试器
{
    if (!canUse) {
      document.head.innerHTML =
        '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">';
      document.body.innerHTML =
        '<div class="weui_msg"><div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div><div class="weui_text_area"><h4 class="weui_msg_title">请在手机端打开链接</h4></div></div>';
    }

}

export default {
  isWeixin,
  isAndroid,
  isIOS,
  isIphone,
  isIphoneX,
  isIphoneXSMAX,
  isIphoneXR,
  isIphoneXup,
  canUse
}