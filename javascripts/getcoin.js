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
        }, 10000);
        var codeFlag=false;
        var codebox=document.getElementsByName("checkCode")[0];
        var timer = setInterval(function(){
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
                    action: "success",
                });
                window.close();
            }
        }, 100);
    });
}