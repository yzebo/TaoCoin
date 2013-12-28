chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch(request.action){
        case 'getValue':
            sendResponse({
                'user': localStorage.getItem('user'),
                'pwd': DeStr(localStorage.getItem('pwd')),
                'quit': localStorage.getItem('quit')
            });
            break;
        case 'loginCode':
            notify('TaoCoin','请在淘宝登陆页面输入验证码！');
            break;
        case 'coinCode':
            notify('TaoCoin','请在领金币页面输入验证码！');
            sendResponse({});
            break;
        case 'errorName':
            notify('TaoCoin','自动登录淘宝失败，密码和账户名不匹配，请检查你保存的账号和密码是否正确！');
            break;
        case 'success':
            notify('TaoCoin','今日网页淘金币领取成功！');
            finish(request);
            break;
        case 'closetab':
            chrome.tabs.remove(sender.tab.id, function (){});
            break;
        }
    }
)

function Login(url){
    chrome.tabs.create({
        url: "https://login.taobao.com/member/login.jhtml?from=taocoin&redirect_url="+encodeURIComponent(url),
        active: true
    });
}

var getting=false;
var today;
function createTimer() {
    var myTimer=setInterval(function(){
        today=(new Date).getDate();        
        var lastday=localStorage['lastday'] || 0;
        if(today!=lastday && !getting && localStorage['user']){
            getting=true;
            clearInterval(myTimer);
            Login("http://vip.taobao.com/vip_home.htm?auto_take=true&from=taocoin"); //get coin
        }
    }, 3000);
}
createTimer();

function finish(data) {
    localStorage['lastday']=today;
    localStorage['coins']=data.coins;
    localStorage['days']=data.days;
    localStorage['num']=data.num;
    getting=false;
    createTimer();
}

function DeStr(text) {
    var i;
    var res = new Array();
    var s=text.split("\\");
    for(i=1;i<s.length;i++){
        res+=String.fromCharCode(parseInt(s[i],8));
    }
    return res;
}

function notify(title,msg) {
    if(localStorage['inform']=='true'){
        chrome.notifications.create("", {
                    type: "basic",
                    title: title,
                    message: msg,
                    iconUrl: "icons/128.png"
        }, function(){});
    }
}