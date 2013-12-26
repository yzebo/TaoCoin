chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch(request.action){
        case 'getValue':
            sendResponse({
                'user': localStorage.getItem('user'),
                'pwd': DeStr(localStorage.getItem('pwd'))
            });
            break;
        case 'checkCode':
            notify('登录淘宝失败','请在网页输入验证码！');
            break;
        case 'success':
            notify('TaoCoin','今日网页淘金币领取成功！');
            break;
        }
    }
);
function GetCoin(){
    chrome.tabs.create({
        url: "https://login.taobao.com/?from=taocoin&redirect_url="+encodeURIComponent("http://vip.taobao.com/vip_home.htm?auto_take=true&from=taocoin"),
        active: true
    });
}
GetCoin();

function DeStr(text){
    var i;
    var res = new Array();
    var s=text.split("\\");
    for(i=1;i<s.length;i++){
        res+=String.fromCharCode(parseInt(s[i],8));
    }
    return res;
}

function notify(title,msg) {
    chrome.notifications.create("", {
                type: "basic",
                title: title,
                message: msg,
                iconUrl: "icon128.png"
    }, function(){});
}