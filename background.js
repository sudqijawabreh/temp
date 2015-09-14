
 chrome.browserAction.onClicked.addListener(function(){
        var op={
          iconUrl:"icon.png",
          type:"basic",
          title:"you have new course",
          message:"you better check your zajel account"
        }
        chrome.notifications.create("coursDone",op,function(){});
 });



