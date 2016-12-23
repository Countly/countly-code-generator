function parseParams(url){
    var params = {}
    if (url) {
       var parts = url.substring(1).split('&');

       for (var i = 0; i < parts.length; i++) {
           var nv = parts[i].split('=');
           params[nv[0]] = nv[1]
       }
   }
   return params;
}
function stripTrailingSlash(str) {
	if(str.substr(str.length - 1) == '/') {
		return str.substr(0, str.length - 1);
	}
	return str;
}

//some default pre init
var Countly = Countly || {};
Countly.q = Countly.q || [];

//provide countly initialization parameters
Countly.app_key = 'e476ab9e70b1e5c1da60e9da7f2b7d99c24dcff7';
Countly.url = 'https://stats.count.ly'; //or none for default countly cloud

Countly.q.push(['track_sessions']);
Countly.q.push(['track_pageview']);
Countly.q.push(['track_clicks']);
Countly.q.push(['track_errors']);
Countly.q.push(['track_links']);
Countly.q.push(['track_forms']);

//load countly script asynchronously
(function() {
   var cly = document.createElement('script'); cly.type = 'text/javascript';
   cly.async = true;
   //enter url of script here
   cly.src = 'https://stats.count.ly/sdk/web/countly.min.js';
   cly.onload = function(){Countly.init()};
   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cly, s);
})();


//Localize JS
!function(a){if(!a.Localize){a.Localize={};for(var e=["translate","untranslate","phrase","initialize","translatePage","setLanguage","getLanguage","detectLanguage","getAvailableLanguages","untranslatePage","bootstrap","prefetch","on","off"],t=0;t<e.length;t++)a.Localize[e[t]]=function(){}}}(window);
Localize.initialize({
    key: 'buFg7dnpzhfFJ',
    rememberLanguage: true,
    translateAlt:false,
    blockedClasses: ["no-translate","code"]
 });
 
 function getAdvancedOptions(){
     return $(".advanced-list input").map(function(el){
                if(this.type == "text"){
                    if($(this).hasClass("arr") && this.value.replace(/^\s+|\s+$/gm,'') != ""){
                        var arr = this.value.split(",");
                        for(var i = 0; i < arr.length; i++){
                            arr[i] = arr[i].replace(/^\s+|\s+$/gm,'');
                        }
                        return {id:this.id, value:JSON.stringify(arr)};
                    }
                    else if(isNaN(this.value))
                        return {id:this.id, value:'"'+this.value+'"'};
                    else
                        return {id:this.id, value:this.value};
                }
                else if(this.type == "checkbox" && this.checked)
                    return {id:this.id, value:this.value};
                else
                    return {id:this.id, value:""};
            }).get().filter(function(el){
                if(el.value.length && el.value != '""')
                    return true;
                return false;
            });
 }
 
$( document ).ready(function() {
    $(".advanced span.label").click(function(){
       $(this).parent().find(".advanced-list").toggle(); 
    });
});