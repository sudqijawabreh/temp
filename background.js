
   chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    alert(request.links);
   });
  var d="";
var getMp4Url=function(html){
  var url=$(html).find('#wistia_13_source').attr('src');
  d=url;
  alert(url);
}
var getFlashUrl=function(html){
var raw=$(html).find('param[name="flashvars"]').attr('value')
console.log(html);
if(raw==undefined){
  getMp4Url(html);
}
else{
var url=raw.substring(raw.lastIndexOf("videoUrl")+("videoUrl=").length,raw.lastIndexOf('&'));

alert(d=decodeURIComponent(url));
}
}
 
 chrome.browserAction.onClicked.addListener(function(tab){
   var currentId=0;
  chrome.tabs.executeScript(tab.id,{file:"jquery-2.1.4.min.js"});
  chrome.tabs.executeScript(tab.id,{file:"extract.js"});


});

  var r= new XMLHttpRequest();
  r.open("GET","https://www.skillfeed.com/courses/5874-learn-complete-wordpress-security?video_id=73288-safe-secure-passwords",true);
  r.send();
    r.onreadystatechange=function(){

      if(r.readyState==4&&r.status==200){
        getFlashUrl(r.response);
     }
   }
/*  chrome.webRequest.onBeforeSendHeaders.addListener(

        function(details) {
          var newValue="";
        
        
            alert(details.url) ;
         
            if(details.url=="https://zajelbs.najah.edu/servlet/ZajSSChk"){
              newValue="https://zajelbs.najah.edu/servlet/mainN";
            }
            else if(details.url=="https://zajelbs.najah.edu/servlet/login")newValue="http://zajel.najah.edu";
            else if(details.url=="https://zajelbs.najah.edu/servlet/stuReg?main=")newValue="https://zajelbs.najah.edu/servlet/mainN";


        
        details.requestHeaders.push({
        name: 'Referer',
        value: newValue,
    });
        details.requestHeaders.push({
        name: 'Content-Type',
        value: "application/x-www-form-urlencoded; charset=UTF-8",
    });  
    return {
        requestHeaders: details.requestHeaders
    };
       },
        {urls: ["https://embed-ssl.wistia.com/deliveries/*"]},
        ["blocking", "requestHeaders"]);
*/
