
var daysOffset = 0;

function prev() {
    daysOffset--;
    go(null, true);
}

function next() {
    daysOffset++;
    go(null, true);
}

function today() {
    var dt = new Date();

    var yyyy = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    var dtStr = yyyy + '-' + month + "-" + day;
    document.getElementById("currentDay").innerHTML = dtStr.replace('=', '');
    //document.getElementById("iframeTag").src = "https://hocdevotion.org/event/" + dtStr;
    document.title = "基督之家第五家QT讀經靈修 - " + dtStr.replace('=', '');
    var currentUrl = window.location.href;
    if(currentUrl.indexOf('/?')){
        currentUrl = currentUrl.split('/?')[0];
    }
    window.location.href = currentUrl +'?'+dtStr;
}
function go(dtStr, removeCurrentDate) {
    if(dtStr){
        document.getElementById("currentDay").innerHTML = dtStr.replace('=', '').replace('/','');
        document.title = "基督之家第五家QT讀經靈修 - " + dtStr.replace('=', '').replace('/','');
        document.getElementById("iframeTag").src = "https://hocdevotion.us/event/" + dtStr.replace('/','') +'/?variant=zh-cn';
    }else{
        var currentUrl = window.location.href;
        var current_time = new Date().getTime();
        if(removeCurrentDate && currentUrl.includes("?")){
            var passedInDT = currentUrl.split('?')[1];
            var passedInDTParts = passedInDT.split('-');
            var dt = new Date();
            dt.setFullYear(parseInt(passedInDTParts[0].trim()));
            dt.setMonth(parseInt(passedInDTParts[1].trim()) -1);
            dt.setDate(parseInt(passedInDTParts[2]));
            current_time = dt.getTime();
        }
        var dayMS = 24 * 60 * 60 * 1000;
        var dt = new Date(current_time + daysOffset * dayMS);

        var yyyy = dt.getFullYear();
        var month = dt.getMonth() + 1;
        var day = dt.getDate();
        var dtStr = yyyy + '-' + month + "-" + day;
        document.getElementById("currentDay").innerHTML = dtStr.replace('=', '');
        //document.getElementById("iframeTag").src = "https://hocdevotion.us/event/" + dtStr;
        document.title = "基督之家第五家QT讀經靈修 - " + dtStr.replace('=', '');;

        if(removeCurrentDate && currentUrl.includes("?")){
            currentUrl = currentUrl.split("?")[0];
        }
        window.location.href = currentUrl +'?'+dtStr+'/?variant=zh-cn';
    }
}


const currentUrl =  window.location.href;
if(currentUrl.indexOf('?')>0){
    setTimeout(()=>{ go(currentUrl.split('?')[1], false); });
}else{
    setTimeout(()=>{ go(null, false);});
}
