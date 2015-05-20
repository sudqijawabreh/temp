var planIntervalTime=1000*60;
var inComingCourses=[];
var courseId=[];
chrome.storage.sync.get('[inComingCourses,oldCourses]',function(items){
  if(items.inComingCourses!=undefined)inComingCourses=items.inComingCourses;
  if(items.courseId!=undefined)courseId=items.oldCourses;
});
  chrome.webRequest.onBeforeSendHeaders.addListener(

        function(details) {
          var newValue="";
        
        
         
         
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
        {urls: ["https://zajelbs.najah.edu/servlet/login","https://zajelbs.najah.edu/servlet/ZajSSChk","https://zajelbs.najah.edu/servlet/stuReg?main="]},
        ["blocking", "requestHeaders"]);
 
        var plan =new XMLHttpRequest();

 chrome.browserAction.onClicked.addListener(function(){
        var op={
          iconUrl:"icon.png",
          type:"basic",
          title:"you have new course",
          message:"you better check your zajel account"
        }
        chrome.notifications.create("coursDone",op,function(){});
 });

 
  findOldCourses=function(page){
        var images=$(page).find('img').filter(function(){
           return $(this).attr('src')=="https://zajelbs.najah.edu:443/zajel/images/curricula/oldreg.jpg";
        })
         
        for (var i = 1; i < images.length; i++) {
          courseId.push($(images[i]).closest('tr').find('td:eq(1)').text());
        };
        chrome.storage.sync.set({'oldCourses':courseId},function(){
            checkForIncoming(page);
          

        });
        


    };
  checkForIncoming=function(page){
    
      for (var i = 0; i < courseId.length; i++) {
                
        var tr=$(page).find('tr').filter(function(){return $(this).find('td:eq(1)').text()==courseId[i]});
        if($(tr).find('img').attr('src')=="https://zajelbs.najah.edu:443/zajel/images/curricula/needed.gif"){
          inComingCourses.push(courseId);
           var op={
          iconUrl:"icon.png",
          type:"basic",
          title:"prepare yourself",
          message:"brace yourself winter is comming"
        }
        chrome.notifications.create("coursWait",op,function(){});
        }
      };
      chrome.storage.sync.set({'inComingCourses':inComingCourses});
    
    

    
  }
  checkDoneCourses=function(page){
    for (var i = 0; i < inComingCourses.length; i++) {
      var temp=$(page).find('tr').filter(function(){return $(this).find('td:eq(1)')==inComingCourses[i]});
      if($(temp).find('td:eq(4)').text()!=""){
        var op={
          iconUrl:"icon.png",
          type:"basic",
          title:"you have new course",
          message:"you better check your zajel account"
        }
        chrome.notifications.create("coursDone",op,function(){});
        console.log("hi boddy");
        inComingCourses.pop(inComingCourses[i]);
        courseId.pop(inComingCourses[i]); 
      }
    };
  }
  
  
  var r= new XMLHttpRequest();
  var c=new XMLHttpRequest();
  r.open("POST","https://zajelbs.najah.edu/servlet/login",true);
  r.send( "startDate=1401949868491&stuNum=11317458&pasWrd=975509548");
  
    r.onreadystatechange=function(){

      if(r.readyState==4&&r.status==200) c.send();
      else if(r.readyState==4){
        while(r.status!=200){
          r.open("POST","https://zajelbs.najah.edu/servlet/login",true);
          r.send( "startDate=1401949868491&stuNum=11317458&pasWrd=975509548");   
        }
      }
      var loginInterval=setInterval(function(){r.open("POST","https://zajelbs.najah.edu/servlet/login",true);
    r.send( "startDate=1401949868491&stuNum=11317458&pasWrd=975509548");
    if(r.readyState==4&&r.status==200) {
      c.open("GET","https://zajelbs.najah.edu/servlet/ZajSSChk",true);
      c.send();
    }
   },1000*60*14)};
  c.open("GET","https://zajelbs.najah.edu/servlet/ZajSSChk",true);
  plan.open("POST","https://zajelbs.najah.edu/servlet/curricula",true);

 
 
  
  c.onreadystatechange=function(){
   if(c.readyState==4&&c.status==200){
      plan.open("POST","https://zajelbs.najah.edu/servlet/curricula",true);
      plan.send();
      var planInterval=setInterval(function(){plan.open("POST","https://zajelbs.najah.edu/servlet/curricula",true);plan.send();},planIntervalTime);
    }
  }

plan.onreadystatechange=function(){
  if(plan.readyState==4&&plan.status==200){
    var html=$(plan.responseText);
    if(inComingCourses.length!=0)planIntervalTime=1000*15;
    if(courseId.length==0)findOldCourses(html);
    checkForIncoming(html);
    if(inComingCourses.length!=0)checkDoneCourses(html);
  
 }
}


