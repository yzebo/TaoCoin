//get parameters from url
var para = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

if(para.from){
    window.addEventListener('load', function(){
        setTimeout(function(){
            //window.close();
        }, 15000);
        if(document.querySelector('.ci_receive')){
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, true);
            document.querySelector('.ci_receive').dispatchEvent(evt);
            if(document.querySelector(".icon-success")){
                chrome.runtime.sendMessage({
                    action: "notify",
                    title: 'TaoCoin',
                    msg: '一淘签到成功，获得'+document.querySelector(".message-info span").innerHTML+'个集分宝！'
                });
            }
            else{
                chrome.runtime.sendMessage({
                    action: "notify",
                    title: 'TaoCoin',
                    msg: '一淘签到失败，今天已经领过集分宝了！'
                });
            }
            chrome.runtime.sendMessage({
                action: "login",
                url: 'http://ka.tmall.com/?from=taocoin'
            });
            
            //logoff and quit
            chrome.runtime.sendMessage({
                action: "getValue"
            }, function(response) {
                if(response.quit=="true"){
                    var evt = document.createEvent("MouseEvents");
                    evt.initEvent("click", true, true);
                    document.querySelector('#J_Logout').dispatchEvent(evt);
                }
            });
            /*chrome.runtime.sendMessage({
                action: "closetab"
            });*/
        }
    });
}