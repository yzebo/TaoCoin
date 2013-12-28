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
            window.close();
        }, 15000);
        var codeFlag=false;
        var codebox;
        var timer = setInterval(function(){
            codebox=document.getElementsByName("checkCode")[0];
            if(!codeFlag && codebox){
                chrome.runtime.sendMessage({
                    action: "coinCode",
                }, function(){
                    codeFlag=true;
                });
                codebox.focus();
            }
            if(document.querySelector('.coin-overlay-btn')){
                clearInterval(timer);
                chrome.runtime.sendMessage({
<<<<<<< HEAD
                    action: "success",
                    coins: document.querySelector('.user-coin a').innerHTML || 0,
                    days: document.querySelectorAll('.coin-day em')[0].innerHTML || 0,
                    num: document.querySelectorAll('.coin-day em')[1].innerHTML || 0
=======
                    action: "success"
>>>>>>> d7cf2e3b0348e59488fd5a69ef1ba8b9378011f0
                });
                //logoff and quit
                chrome.runtime.sendMessage({
                    action: "getValue"
                }, function(response) {
                    if(response.quit=="true"){
                        var evt = document.createEvent("MouseEvents");
                        evt.initEvent("click", true, true);
                        document.querySelectorAll('.user-operate a')[1].dispatchEvent(evt);
                    }
                });
                chrome.runtime.sendMessage({
                    action: "closetab"
                });
            }
        }, 100);
    });
}
