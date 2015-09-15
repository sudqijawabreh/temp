
 chrome.browserAction.onClicked.addListener(function(tab){
   var currentId=0;
  chrome.tabs.executeScript(tab.id,{file:"jquery-2.1.4.min.js"});
  chrome.tabs.executeScript(tab.id,{file:"extract.js"});
  chrome.downloads.download({url:"https://embed-ssl.wistia.com/deliveries/9b0667a29b9d0d37be229060f8e42ebc7e8ed3ee/file.mp4"})
});

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
