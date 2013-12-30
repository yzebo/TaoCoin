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
        if(document.querySelector('.right_button')){
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, true);
            document.querySelector('.right_button').dispatchEvent(evt);
            if(document.querySelector(".dq_count").innerHTML!=""){
                chrome.runtime.sendMessage({
                    action: "notify",
                    title: 'TaoCoin',
                    msg: '天猫签到成功，获得'+document.querySelector('.dq_count').innerHTML.substr(0,request.points.length-1)+'猫券！'
                });
            }
            else{
                chrome.runtime.sendMessage({
                    action: "notify",
                    title: 'TaoCoin',
                    msg: '天猫签到失败，今天已经领过猫券了！'
                });
            }
            //logoff and quit
            chrome.runtime.sendMessage({
                action: "getValue"
            }, function(response) {
                if(response.quit=="true"){
                    var evt = document.createEvent("MouseEvents");
                    evt.initEvent("click", true, true);
                    document.querySelector('.sn-logout').dispatchEvent(evt);
                }
            });
            chrome.runtime.sendMessage({
                //action: "closetab"
            });
        }
    });
}