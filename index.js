window.encodeToWindows1256=function(name){
    var iconv=require('iconv-lite');
    buf = iconv.encode(name, 'win1256');
    str="";
    for(var i=0;i<buf.length;i++){
        str+="%"+buf[i].toString(16);
    }
    str=str.toUpperCase();
    return str;
};
