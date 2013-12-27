$(document).ready(function() {
    restoreOptions();
    bindAction();
});

function showUser(status) {
    $("#getuser").hide();
    $("#setuser").hide();
    $(status).show();
}

function bindAction() {
    $('#options').on('click',function(){
        chrome.tabs.create({url:chrome.extension.getURL("options.html"),selected:true});
    });
    $('#change').on('click',function(){
        showUser("#setuser");
    });
    $('#save').on('click',function(){
        saveOptions();
    });
    $('#cancel').on('click',function(){
        //window.close();
        notify('yzebo');
    });
    $('#save').on('shown.bs.popover', function () {
        if(check()){
            setTimeout(function(){$('.popover').hide();},1200);
        }
    });
}

function restoreOptions() {
    if (localStorage['user']) {
        $('#cur_user').text(localStorage['user']);
        $('#username').val(localStorage['user']);
        showUser("#getuser");
    }
    else {
        showUser("#setuser");
    }
    $('#password').val("");
    if (localStorage['phone'] == 'true') {
        $('#phone').prop('checked','checked');
    }
    if (localStorage['inform'] == 'true') {
        $('#inform').prop('checked','checked');
    }
    if (localStorage['quit'] == 'true') {
        $('#quit').prop('checked','checked');
    }
}

function saveOptions() {
    if(check()){
        localStorage['user'] = $('#username').val();
        localStorage['pwd'] = EnStr($('#password').val());
        localStorage['phone'] = $('#phone').is(":checked");
        localStorage['inform'] = $('#inform').is(":checked");
        localStorage['quit'] = $('#quit').is(":checked");
        restoreOptions();
        $('#save').popover('show');
        $('#save').popover('hide');
        console.log('show');
    }
}

function check() {
    if($("#setuser")[0].style.display=='block' && (!$('#username').val() || !$('#password').val())){
        $('#setuser').addClass('has-error');
        $('#username').focus();
        return false;
    }
    else{
        if($('#setuser').hasClass('has-error')){
            $('#setuser').removeClass('has-error');
        }
    }
    return true;
}

function notify(msg) {
    chrome.notifications.create("", {
                type: "basic",
                title: "TaoCoin",
                message: msg+"淘金币领取失败，请检查用户名密码！",
                iconUrl: "icon128.png"
    }, function(){});
}

function EnStr(text){
    var i,s;
    var res = new Array();
    for(i=0;i<text.length;i++){
        res+="\\"+text.charCodeAt(i).toString(8); 
    }
    return res;
}