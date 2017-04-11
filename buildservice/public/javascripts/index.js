var packBtn = document.getElementById('pack');
packBtn.addEventListener('click',(e) => {
    console.log(e.target);
    makeRequest('pack');
},false)

var httpRequest;
function makeRequest(url) {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = alertContent;
    httpRequest.open('POST', url);
    httpRequest.send();
}
function alertContent() {
    if(httpRequest.readyState === XMLHttpRequest.DONE){
        if(httpRequest.status === 200){
            console.log(httpRequest.responseText);
        }else {
            console.log('request error');
        }
    }
}
