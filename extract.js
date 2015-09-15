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
chrome.downloads.download({url:d});



