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
    $('#change').on('click',function(){
        showUser("#setuser");
    });
    $('#save').on('click',function(){
        saveOptions();
    });
    $('#cancel').on('click',function(){
        window.close();
    });
    $('#home').on('click',function(){
        chrome.extension.getBackgroundPage().Login("http://www.taobao.com");
        return false;
    });
}

function restoreOptions() {
    if (localStorage['user']) {
        $('#cur_user').text(localStorage['user']);
        $('#username').val(localStorage['user']);
        $('#coins').text(localStorage['coins'] || 0);
        $('#days').text(localStorage['days'] || 0);
        $('#num').text(localStorage['num'] || 0);
        showUser("#getuser");
    }
    else {
        showUser("#setuser");
    }
    $('#password').val("");
    if (localStorage['phone'] == 'true') {
        $('#phone').prop('checked','checked');
        $('small').append('<span>+</span>');
        var pnum=document.createElement("a");
        pnum.appendChild(document.createTextNode(localStorage['num'] || 0));
        pnum.title="手机客户端淘金币";
        pnum.id="pnum";
        $('small').append(pnum);
        $('#pnum').css("color", "#FC4400");
    }
    if (localStorage['inform'] == 'true') {
        $('#inform').prop('checked','checked');
    }
    if (localStorage['quit'] == 'true') {
        $('#quit').prop('checked','checked');
    }
    if (localStorage['etao'] == 'true') {
        $('#etao').prop('checked','checked');
    }
}

function saveOptions() {
    if(check()){
        if($('#username').val()){
            if(localStorage['user'] != $('#username').val()){
                localStorage['coins']=0;
                localStorage['days']=0;
                localStorage['num']=0;
            }
            localStorage['user'] = $('#username').val();
        }
        if($('#password').val()){
            localStorage['pwd'] = EnStr($('#password').val());
        }
        localStorage['phone'] = $('#phone').is(":checked");
        localStorage['inform'] = $('#inform').is(":checked");
        localStorage['quit'] = $('#quit').is(":checked");
        localStorage['etao'] = $('#etao').is(":checked");
        location.reload();
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

function EnStr(text){
    var i,s;
    var res = new Array();
    for(i=0;i<text.length;i++){
        res+="\\"+text.charCodeAt(i).toString(8); 
    }
    return res;
}