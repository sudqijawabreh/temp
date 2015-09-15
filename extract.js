var d="";
var getMp4Url=function(){
	var url=$('#wistia_13_source').attr('src');
	d=url;
	alert(url);
}
var getFlashUrl=function(){
var raw=($('param[name="flashvars"').attr('value'));
if(raw==undefined){
	getMp4Url();
}
else{
var url=raw.substring(raw.lastIndexOf("videoUrl")+("videoUrl=").length,raw.lastIndexOf('&'));

alert(d=decodeURIComponent(url));
}
}
getFlashUrl();
  var vids=$('.vids');
  var pageUrl=document.URL;
  var urls=[];
  for(var i=0;i<vids.length;i++){
    var temp=$(vids[i]).find('a').attr('href');
    urls.push(pageUrl+temp);
    alert(urls[i]);
  }
chrome.runtime.sendMessage({links:urls},function(response){
	console.log(response.farewell);
});



