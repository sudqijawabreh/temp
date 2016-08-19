chrome.storage.local.get('[inComingCourses,oldCourses]',function(items){
    if(items.inComingCourses!==undefined)inComingCourses=items.inComingCourses;
    if(items.courseId!==undefined)courseId=items.oldCourses;
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
            //       details.requestHeaders.push({
            //       name: 'Content-Type,
            //       value: "application/x-www-form-urlencoded; charset=UTF-8",
            //   });
            return {
                requestHeaders: details.requestHeaders
            };
        },
        {urls: ["http://www2.najah.edu/gradarch/default.asp"]},
        ["blocking", "requestHeaders"])

name="";
avg=0;
high=100;
low=0;
debugger;
//while(true){
//for(var i=0;i<10;i++){
        var s=getStudentFromServer();
        console.log(s.name);
        console.log(s.id);
        var avg=(binaryGeuss(name,low,high));
        console.log(avg);
        setStudentAvg(s,avg);
        if(i==5)chrome.runtime.reload();

//}
//}
//chrome.browserAction.onClicked.addListener(function(){
//});
function getStudentFromServer(){
    var xhr= new XMLHttpRequest();
    xhr.open("POST","http://localhost/getName.php",false);
    xhr.send();
    name=$(xhr.responseText).filter('input').first().val();
    var id =$(xhr.responseText).filter('input').next().val();
    var student={};
    student.id=id;
    student.name=name;
    return student;
}
function setStudentAvg(student,avg){
    var r= new XMLHttpRequest();
    r.open("POST","http://localhost/setAvg.php",false);
    r.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    r.send("id="+student.id+"&avg="+avg);
}
function requestEqualAvg(name,avg){
    //	  var xhr= new XMLHttpRequest();
    //	  xhr.open("POST","http://localhost/getName.php",false);
    //      xhr.send();
    //              name=$(xhr.responseText).filter('input').val();
    var r= new XMLHttpRequest();
    r.open("POST","http://www2.najah.edu/gradarch/default.asp",false);
    r.setRequestHeader("Content-Type","application/x-www-form-urlencoded;UTF-8");
    r.onreadystatechange=function(){
        if(r.readyState==4 && r.status==200){
        }
    };
    var string="%' and stu_avg="+avg+" and stu_nam <>'%";
    string=encodeURI(string);
    r.send("multiple=2&stuNam="+name+string);
    return r.responseText;

}
function requestAboveAvg(name,avg){
    //	  var xhr= new XMLHttpRequest();
    //	  xhr.open("POST","http://localhost/getName.php",false);
    //      xhr.send();
    //              name=$(xhr.responseText).filter('input').val();
    var r= new XMLHttpRequest();
    r.open("POST","http://www2.najah.edu/gradarch/default.asp",false);
    r.setRequestHeader("Content-Type","application/x-www-form-urlencoded;UTF-8");
    r.onreadystatechange=function(){
        if(r.readyState==4 && r.status==200){
        }
    };
    var string="%' and stu_avg>="+avg+" and stu_nam <>'%";
    string=encodeURI(string);
    r.send("multiple=2&stuNam="+name+string);
    return r.responseText;

}
function isEqualAvg(name,avg){
    str=encodeToWindows1256(name.trim());
    var page=requestEqualAvg(str,avg);
    var table=getTable(page);
    var rows=getRows(table); if(rows.length==1){
    }
    else{
        for(var i=1;i<rows.length;i++){
            var columns=getColumns(rows[i]);
            if($(columns[0]).text().trim()==name.trim()||rows.length==2)
                return true;
        }
    }
    return false;
}
function isAboveAvg(name,avg){
    str=encodeToWindows1256(name.trim());
    var page=requestAboveAvg(str,avg);
    var table=getTable(page);
    var rows=getRows(table);
    if(rows.length==1){
        return false;
    }
    else{
        for(var i=1;i<rows.length;i++){
            var columns=getColumns(rows[i]);
            if($(columns[0]).text().trim()==name.trim()||rows.length==2)
                return true;
        }
    }
    return false;


}
function binaryGeuss(name,left,right){
    var mid=(right+left)/2.0;
        mid=Number(Math.round(mid+'e'+2)+'e-'+2);
    if(mid<0.5)return 0;
    equal=null;

var above=null;
    var below=null;
    while(equal==null){
        try{
            var equal =isEqualAvg(name,mid);
        }
        catch(e){
            setTimeout(function(){},1000);
        }
    }

    console.log(mid);
    if(equal==true){
        return mid;
        try
        {
            console.log(mid);
        }
        catch(e){
            console.log('faild request');
            setTimeout(function(){},1000);
        }
    }
    else if(isAboveAvg(name,mid)){
        console.log('right');
        while(true){
            try{
                return binaryGeuss(name,mid,right);
            }
            catch(e){
                setTimeout(function(){},1000);
                console.log('faild request');
            }
        }
    }
    else{
        if(mid==50)
            mid=4;
        console.log('left');
        while(true){
            try{
                return binaryGeuss(name,left,mid);
            }
            catch(e){
                console.log('faild request');
                setTimeout(function(){},1000);
            }
        }

    }
}
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
