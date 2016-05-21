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
     getThemAll();
	 });
        
function getThemAll(){
    for(var i=2;i<20;i++){
        for(var j=1;j<37;j++){
            getPage(i,j);
        }
    }
        for(var j=1;j<37;j++){
            getPage(21,j);
        }
        for(var j=1;j<37;j++){
            getPage(39,j);
        }
        for(var j=1;j<37;j++){
            getPage(40,j);
        }
    
}
function getPage(colCod,fawjCod){
      var r= new XMLHttpRequest();
      r.open("POST","http://www2.najah.edu/gradarch/default.asp",true);
      r.send("multiple=3&colCod="+colCod+"&fawjCod="+fawjCod);
        r.onreadystatechange=function(){

          if(r.readyState==4&&r.status==200){
            extractPage(r.responseText);
         }
        }
}
function extractPage(page){
    var table=getTable(page);
    var rows=getRows(table);
    var students=[];
    for(var i=1;i<rows.length;i++){
       var student=rowToJson(rows[i]); 
       students[i-1]=student;
    }
    sendStudents(students);
}
function sendStudents(students){
	  var r= new XMLHttpRequest();
	  r.open("POST","http://localhost/database.php",true);
	    r.onreadystatechange=function(){

	      if(r.readyState==4&&r.status==200){
	     }
	 };
r.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//r.setRequestHeader("Content-type","application/json");
	  r.send("students="+JSON.stringify(students));

}
function rowToJson(row){
    var columns=getColumns(row);
    var name,collage,spec,semester,year,fawj,birthPlace;
    name=$(columns[0]).text();
    collage=$(columns[1]).text();
    spec=$(columns[2]).text();
    semester=$(columns[3]).text();
    year=$(columns[4]).text();
    fawj=$(columns[5]).text();
    birthPlace=$(columns[6]).text();

    student={"name":name,"collage":collage,"spec":spec,"semester":semester,"fawj":fawj,"birth_place":birthPlace,"year":year};
    return student;
}

function getTable(page){
    return $(page).filter('table')[1];
}
function getRows(table){
    return $(table).find('tr');
}
function getColumns(row){
    return $(row).find('td');
};
