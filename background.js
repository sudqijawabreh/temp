chrome.storage.local.get('[inComingCourses,oldCourses]',function(items){
  if(items.inComingCourses!=undefined)inComingCourses=items.inComingCourses;
  if(items.courseId!=undefined)courseId=items.oldCourses;
});
  chrome.webRequest.onBeforeSendHeaders.addListener(

        function(details) {
          var newValue="";
        
        
         
         
            if(details.url=="http://www2.najah.edu/gradarch/default.asp"){
              newValue="http://www2.najah.edu/gradarch/default.asp";
            }
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
        {urls: ["http://www2.najah.edu/gradarch/default.asp"]},
        ["blocking", "requestHeaders"]);
 

 chrome.browserAction.onClicked.addListener(function(){
	  var r= new XMLHttpRequest();
	  r.open("POST","http://www2.najah.edu/gradarch/default.asp",true);
	  r.send();
	    r.onreadystatechange=function(){

	      if(r.readyState==4&&r.status==200){
		console.log(r.responseText);
	     }
	 };
});


