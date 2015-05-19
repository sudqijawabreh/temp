
var inComingCourses=[];
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

 });

 
  findOldCourses=function(page){
        var images=$(page).find('img').filter(function(){
           return $(this).attr('src')=="https://zajelbs.najah.edu:443/zajel/images/curricula/oldreg.jpg";
        })
        var courseId=[];
        for (var i = 1; i < images.length; i++) {
          courseId.push($(images[i]).closest('tr').find('td:eq(1)').text());
        };
        chrome.storage.sync.set({'oldCourses':courseId},function(){
            checkForIncoming(page);

/*          chrome.storage.sync.get('oldCourses',function(items){
            courseId=items.oldCourses;

            for (var i = 0; i < courseId.length; i++) {
              inComingCourses.push($(page).find('tr').filter(function(){return $(this).find('td:eq(1)').text()==courseId[i]&&$(this).find('img').attr('src')=="https://zajelbs.najah.edu:443/zajel/images/curricula/needed.gif"}));
            };
            
          });
        */
    
          

        });
        


    };
  checkForIncoming=function(page){
    
    var courseId=[];
    chrome.storage.sync.get('oldCourses',function(items){
      courseId=items.oldCourses;
      for (var i = 0; i < courseId.length; i++) {
                
        var tr=$(page).find('tr').filter(function(){return $(this).find('td:eq(1)').text()==courseId[i]});
        if($(tr).find('img').attr('src')=="https://zajelbs.najah.edu:443/zajel/images/curricula/needed.gif")inComingCourses.push(courseId);
      };
      console.log(inComingCourses);
    });

    
  }
  
  
  var r= new XMLHttpRequest();
  var c=new XMLHttpRequest();
  var main=new XMLHttpRequest();
  r.open("POST","https://zajelbs.najah.edu/servlet/login",true);  
  r.send( "startDate=1401949868491&stuNum=11317458&pasWrd=975509548");
  c.open("GET","https://zajelbs.najah.edu/servlet/ZajSSChk",true);
  plan.open("POST","https://zajelbs.najah.edu/servlet/curricula",true);
  main.open("GET","https://zajelbs.najah.edu/servlet/stuReg?main=",true)

 
 
  r.onreadystatechange=function(){
    if(r.readyState==4&&r.status==200) c.send();
  }
  c.onreadystatechange=function(){
   if(c.readyState==4&&c.status==200) main.send();
  }
main.onreadystatechange=function(){
  if(main.readyState==4&&main.status==200)plan.send();
}
plan.onreadystatechange=function(){
  if(plan.readyState==4&&plan.status==200){
    var html=$(plan.responseText);
    findOldCourses(html);
    var interval =setInterval(function(){
    checkForIncoming(html);
    },1000);
 }
}


