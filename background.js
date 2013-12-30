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
        case 'success':
            notify('TaoCoin','成功领取'+request.num+'网页淘金币！');
            finish(request);
            break;
        case 'notify':
            notify(request.title, request.msg);
            break;
        case 'login':
            Login(request.url);
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
    if(localStorage['phone']=='true'){
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                var data=JSON.parse(xmlhttp.responseText);
                console.log(data.data.receiveCoin);
                if(data.data.receiveCoin && data.data.receiveCoin!='0'){
                    notify('TaoCoin','成功领取'+data.data.receiveCoin+'手机客户端淘金币！');
                    localStorage['coins']=data.data.totalCoin;
                }
                else{
                    notify('TaoCoin','手机客户端领取淘金币失败！');
                    localStorage['coins']=data.data.totalCoin;
                }
            }
        }
        xmlhttp.open("GET","http://api.m.taobao.com/rest/api3.do?sign=f52c451c47d4d00f1d4fc478cdd1125c&ttid=700171%40taobao_android_3.9.5&v=1.0&t=1388293552&imei=867763013440834&data=%7B%22sid%22%3A%228rvpr119rs8fsjgwd3di5qa42oz1cc8d%22%7D&api=mtop.matrixexchange.wireless.shakeCoin.receive&imsi=460023175032645&deviceId=AndSV4DgaO0vQY_9WSmkfBuGL5fsI7FZ6KszbZUtPXXp&appKey=21646297",true);
        xmlhttp.send();
    }
    if(localStorage['etao']=='true'){   //etao signin
        Login('http://www.etao.com/?from=taocoin');
    }
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