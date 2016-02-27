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